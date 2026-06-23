import app from './app.js'
const PORT = 8000;


//Starting the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
})

export default app;