async function main() {
  if (!args) return evalist.message('❌ `I need some arguments!`')

  const ip = args

  let embed
  
  if (ip.includes('/')) {
    embed = new MessageEmbed()
      .setTitle('Wrong ip')
      .setColor('#ff0000')
      .setDescription('Please provide a valid IP address')

    return evalist.message(embed)
  }

  const res = await fetch(`https://ipinfo.io/${escape(ip)}/json`)
  const info = await res.json()

  if (!info.error && !info.bogon) {
   let fields = [
    { name: 'Hostname', value: info.hostname, inline: true},
    { name: 'Location', value: `${info.city}, ${info.region}, ${info.country} :flag_${info.country.toLowerCase()}:`, inline: true },
    { name: 'Organization', value: info.org, inline: true },
    { name: 'Time zone', value: info.timezone, inline: true}
   ]
   
   if (info.anycast) fields.push({ name: 'Anycast', value: ':white_check_mark:', inline: true })
   
   embed = new MessageEmbed()
    .setTitle(`IP Info for ${ip}`)
    .setURL(`https://ipinfo.io/${ip}`)
    .setColor('#0099ff')
    .addFields(fields)
  } else if (info.bogon) {
   embed = new MessageEmbed()
    .setTitle(`:x: Private IP address`)
    .setColor('#ff0000')
    .setDescription('You provided a private IP address.') 
  } else {
   embed = new MessageEmbed()
    .setTitle(info.error.title)
    .setColor('#ff0000')
    .setDescription(info.error.message)
  }

  evalist.message(embed)
}

main()