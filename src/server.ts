import { app } from './app.js';
const PORT = process.env.PORT || 3400;


app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
