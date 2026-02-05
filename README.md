# RL-Black-Magic


## Instructions to upload MM and SM codes to database
1. In root directory (RL-BM folder), add two files called MM.csv and SM.csv
  a. In each of the files, make sure it is just the code, followed by another code. There should also be dashes (-) every third character for example, this is what it should look like in MM.csv

    <img width="227" height="67" alt="Screenshot 2026-01-13 at 3 18 53 pm" src="https://github.com/user-attachments/assets/4ba138c3-b93c-40d5-a1cd-d60595530689" />
  
3. run `node src/utils/productKeyUpload.js` in the terminal
4. It should be uploaded in the "product-keys" database


## Vars needed in env file includes
MONGODB_URI=
PORT=5001
VITE_API_URL=http://localhost:5001/api
MASTER_CODE=
