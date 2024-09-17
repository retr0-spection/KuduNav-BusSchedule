import app from "../app.js";
import Docs from "../routes/docs.js"


app.use('/docs', Docs)

const PORT = process.env.PORT || 3000;


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});