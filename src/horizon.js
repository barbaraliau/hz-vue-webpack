const horizon = Horizon()

horizon.onReady().subscribe(() => {
  console.log("Connected to Horizon server")
})
horizon.connect()

export default horizon