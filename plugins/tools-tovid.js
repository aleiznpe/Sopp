import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'

let handler = async (m, { conn }) => {
  // Verificar que existe un mensaje citado
  if (!m.quoted) {
    return conn.reply(m.chat, '🧐 Responde a un *Sticker Animado.*', m)
  }
  
  let mime = m.quoted.mimetype || ''
  
  // Verificar si el mensaje citado es un sticker o un archivo de audio
  if (!/webp|audio/.test(mime)) {
    return conn.reply(m.chat, '🧐 Responde a un *Sticker Animado.*', m)
  }
  
  try {
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    
    if (/webp/.test(mime)) {
      out = await webp2mp4(media)
    } else if (/audio/.test(mime)) {
      out = await ffmpeg(media, [
        '-filter_complex', 'color',
        '-pix_fmt', 'yuv420p',
        '-crf', '51',
        '-c:a', 'copy',
        '-shortest'
      ], 'mp3', 'mp4')
    }
    
    // Verificar que m.chat no sea undefined
    if (!m.chat) {
      throw new Error('El chat ID (m.chat) no está definido.')
    }
    
    // Enviar el archivo convertido
    await conn.sendFile(m.chat, out, 'video.mp4', null, m)
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, '❌ Ocurrió un error al procesar el archivo.', m)
  }
}

handler.help = ['tovid <sticker>']
handler.tags = ['sticker', 'tools']
handler.command = ['tovideo', 'tovid']

export default handler
