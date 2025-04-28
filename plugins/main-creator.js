let handler = async (m, { conn, usedPrefix, isOwner }) => {
    m.react('👤')
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:ALEIZNBOT;;\nFN:ALEIZNBOT\nORG:ALEIZNBOT\nTITLE:\nitem1.TEL;waid=51992621601:51992621601\nitem1.X-ABLabel:ALEIZNBOT\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:ALEIZNBOT\nEND:VCARD`
    await conn.sendMessage(m.chat, { contacts: { displayName: '@alexdre_sa⁩', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['staff']
handler.tags = ['main']
handler.command = ['owner', 'dueño', 'creador']

export default handler
