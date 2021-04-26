function emoji(name, id) {
  // i don't have nitro so discord turns the emoji into text if i try to send it directly
  return `<:${name}:${id}>`
}

async function main() {
  const EPOCH = 1420070400000

  if (!args) return evalist.message('❌ `I need some arguments!`')

  // yeah... idk regex
  const id = args
    .replace('<@', '')
    .replace('>', '')
    .replace('!', '')
    
  let avatar
  let user
  
  try {
    user = await evalist.fetchUser(id)
  } catch (e) {
    return evalist.message(':x: `Not a valid user!`')
  }
  
  if (user.id === '830211465133686814') return evalist.message('no')
    
  if (!user.bot) return evalist.message(`:x: \`Hmmm... I don't think ${user.username} is a bot!\``)
  
  if (!user.avatar) {
    // https://discord.com/developers/docs/reference#image-formatting
    avatar = `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`
  } else {
    avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`
  }
  
  const embed = new MessageEmbed()
    .setTitle(`:robot: Invite for ${user.username}`)
    .setThumbnail(avatar)
    // https://github.com/vegeta897/snow-stamp/blob/40fcc221785c3de2f4c09d2f4e7c6437f3b055e1/src/App.svelte#L34
    .setTimestamp(new Date(user.id / 4194304 + EPOCH))
    .setDescription(`
      ${emoji('Discord', '836055863268605962')} [Stable](https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot)
      ${emoji('Discord', '836055863268605962')} [PTB](https://ptb.discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot)
      ${emoji('DiscordCanary', '836055863286169630')} [Canary](https://canary.discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot)
    `)

  evalist.message(embed)
}

main()