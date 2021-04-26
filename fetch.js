function main() {
  if (!args) return evalist.message('❌ `I need some arguments!`')

  fetch(args).then(res => res.text()).then(res => console.log(res))
}

main()
