import axios from 'axios'
import { PDFDocument, PDFPage } from '@cantoo/pdf-lib'

export async function generatePdfThumbnailUrl(
  pdfUrl: string,
  sign: string
): Promise<string> {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer', // 确保返回的是 ArrayBuffer 格式的 PDF 数据
      params: {
        sign: sign,
      },
    })

    const pdfBytes = response.data // 获取响应的 PDF 数据
    const pdfHeader = new Uint8Array(pdfBytes).subarray(0, 4)
    const headerString = String.fromCharCode(...pdfHeader)
    if (headerString !== '%PDF') {
      throw new Error('Invalid PDF file')
    }

    // 使用 @cantoo/pdf-lib 加载 PDF 文档
    const pdfDoc: PDFDocument = await PDFDocument.load(pdfBytes)

    // 获取 PDF 的第一页
    const page: PDFPage = pdfDoc.getPage(0)

    // 获取页面尺寸
    const { width, height } = page.getSize()
    const scale = 0.5 // 设置缩放比例
    const scaledWidth = width * scale
    const scaledHeight = height * scale

    // 创建一个 canvas 元素
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('无法获取 Canvas 2D 上下文')
    }

    // 设置 canvas 的宽高
    canvas.width = scaledWidth
    canvas.height = scaledHeight

    // 这里用一个简单的灰色背景作为占位符，实际渲染需要结合其他库
    context.fillStyle = '#ccc'
    context.fillRect(0, 0, scaledWidth, scaledHeight)

    // 将 canvas 的内容转换为 base64 URL
    const thumbnailUrl = canvas.toDataURL('image/png')

    return thumbnailUrl
  } catch (error) {
    console.error('生成缩略图时出错: ', error)
    throw new Error('无法生成缩略图')
  }
}
