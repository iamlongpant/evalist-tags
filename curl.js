`eval ```js
function main() {
  const { exec } = require('child_process')

  exec(`curl ${args} --proxy http://evalist:${token}@localhost:80`, (err, stdout, stderr) => {
    if (err) {
      // remove redundant first line
      let msg = err.message.split('\n')
      msg.shift()
      msg = msg.join('\n')
      return console.log(msg)
    }
    
    console.log(stdout)
  })
}

main()
```