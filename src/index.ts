import picgo from 'picgo'
import { PluginConfig } from 'picgo/dist/utils/interfaces'
import mime from 'mime-types'
const JIANSHU_TOKEN_GET_URL = 'https://www.jianshu.com/upload_images/token.json'
const JIANSHU_UPLOAD_URL = 'https://upload.qiniup.com/'
const JUEJIN_UPLOAD_URL = 'https://cdn-ms.juejin.im/v1/upload?bucket=gold-user-assets'
const CSDN_UPLOAD_URL = 'https://mp.csdn.net/UploadImage?shuiyin=1'

const getTokenOptions = (fileName: string, cookie: string): any => {
  return {
    method: 'GET',
    url: `${JIANSHU_TOKEN_GET_URL}?filename=${fileName}`,
    headers: {
      cookie: cookie
    },
    resolveWithFullResponse: true
  }
}

const postOptions = (url: string, headers: any, formData: any): any => {
  return {
    method: 'POST',
    url: url,
    headers: headers,
    formData: formData,
    resolveWithFullResponse: true
  }
}

const apiUpdated = (ctx: picgo, api: string) => {
  ctx.emit('notification', {
    title: `${api}接口有更新`,
    body: '请打开剪切板网址通知开发者更新',
    text: 'https://github.com/chengww5217/picgo-plugin-blog-uploader'
  })
}

const handle = async (ctx: picgo): Promise<picgo> => {
  const blogOptions = ctx.getConfig('picBed.blog-uploader')
  if (!blogOptions) {
    throw new Error('找不到博客图床配置')
  }

  const imgList = ctx.output
  for (let i in imgList) {
    if (!imgList.hasOwnProperty(i)) continue
    let image = imgList[i].buffer
    if (!image && imgList[i].base64Image) {
      image = Buffer.from(imgList[i].base64Image, 'base64')
    }
    let url = JUEJIN_UPLOAD_URL
    let formData = {}
    let headers = {}
    switch (blogOptions.uploadTo) {
      case '掘金':
        url = JUEJIN_UPLOAD_URL
        formData = {
          file: image
        }
        break
      case '简书':
        url = JIANSHU_UPLOAD_URL
        const tokenOptions = getTokenOptions(imgList[i].fileName, blogOptions.cookie)
        let tokenRes = await ctx.Request.request(tokenOptions)
        if (tokenRes.statusCode === 200 || tokenRes.statusCode === 201) {
          // Get the token successfully
          const tokenBody = JSON.parse(tokenRes.body)
          formData = {
            token: tokenBody.token,
            key: tokenBody.key,
            file: image,
            'x:protocol': 'https'
          }
        }
        break
      case 'CSDN':
        url = CSDN_UPLOAD_URL
        formData = {
          file: {
            value: image,
            options: {
              filename: imgList[i].fileName,
              contentType: mime.lookup(imgList[i].fileName)
            }
          }
        }
        headers = {
          cookie: blogOptions.cookie
        }
        break
    }
    const options = postOptions(url, headers, formData)
    const uploadRes = await ctx.Request.request(options)
    if (uploadRes.statusCode === 200 || uploadRes.statusCode === 201) {
      // Successfully uploaded
      delete imgList[i].buffer
      delete imgList[i].base64Image
      const uploadBody = JSON.parse(uploadRes.body)
      switch (blogOptions.uploadTo) {
        case '掘金':
          if (!uploadBody.d.url.https) {
            apiUpdated(ctx, blogOptions.uploadTo)
          } else {
            imgList[i].imgUrl = uploadBody.d.url.https
          }
          break
        case '简书':
          if (!uploadBody.url) {
            apiUpdated(ctx, blogOptions.uploadTo)
          } else {
            imgList[i].imgUrl = uploadBody.url
          }
          break
        case 'CSDN':
          if (!uploadBody.url && !uploadBody.content) {
            apiUpdated(ctx, blogOptions.uploadTo)
          } else {
            // Remove the oss process, eg: water mark
            let imageUrl
            if (uploadBody.url) imageUrl = uploadBody.url
            else imageUrl = uploadBody.content
            const index = imageUrl.indexOf('?x-oss-process=')
            if (index > -1) {
              imageUrl = imageUrl.substring(0, index)
            }
            imgList[i].imgUrl = imageUrl
          }
          break
      }
    }

  }
  return ctx
}

const config = (ctx: picgo): PluginConfig[] => {
  let userConfig = ctx.getConfig('picBed.blog-uploader')
  if (!userConfig) {
    userConfig = {}
  }
  return [
    {
      name: 'uploadTo',
      type: 'list',
      alias: '上传到',
      choices: ['掘金','简书', 'CSDN'],
      default: userConfig.uploadTo || '掘金',
      required: false
    },
    {
      name: 'cookie',
      type: 'input',
      alias: 'cookie',
      default: userConfig.cookie || '',
      required: false,
      message: '掘金不需要 cookie，其他需要',
      when (answer: any): boolean {
        return answer.uploadTo && answer.uploadTo !== '掘金'
      }
    }
  ]
}

export = (ctx: picgo) => {
  const register = () => {
    ctx.helper.uploader.register('blog-uploader', {
      handle,
      name: '博客图床',
      config: config
    })
  }
  return {
    uploader: 'blog-uploader',
    register
  }
}
