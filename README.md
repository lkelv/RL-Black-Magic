# RL-Black-Magic


## To run code

### Step 1
Pull the code. First run `cd RL-BM`, then run `npm install` in the terminal

### Step 2
Create a file called `.env` in the root directory (RL-BM folder), varibles in the ENV files needed are 
* MONGODB_URI=
* PORT=
* VITE_API_URL=
* MASTER_CODE=
* TURNSTILE_SECRET_KEY=
* VITE_DH_P=
* VITE_DH_G=

### Step 3
Run `cd RL-BM`
Then run `npm run server` and `npm run dev` at the same time.
A local host link will appear from running the latter



## Backend uploads

### Instructions to upload MM and SM codes to database
1. In root directory (RL-BM folder), add two files called MM.csv and SM.csv
   In each of the files, make sure it is just the code, followed by another code. There should also be dashes (-) every third character.
   For example, this is what it should look like in MM.csv

    <img width="227" height="67" alt="Screenshot 2026-01-13 at 3 18 53 pm" src="https://github.com/user-attachments/assets/4ba138c3-b93c-40d5-a1cd-d60595530689" />
  
3. run `node src/utils/not-needed-to-run/productKeyUpload.js` in the terminal
4. It should be uploaded in the "product-keys" database


### Removing master code uses from monogodb
1. Make sure in right directory (RL-BM)
2. Enter `node src/utils/not-needed-to-run/exportMasterLogs.js` into terminal



## Post production

### Changing domain requires to change
* In server.js, change `app.use` origin and add the domain there
* Clouldflare requires to add domain for verification
* Vercel add domain



