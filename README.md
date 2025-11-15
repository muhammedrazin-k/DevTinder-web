 # deployement

  - signup on AWS
  - launch instance
  - change the secret key permission through writing code in terminal like this ( chmod 400 <secretkey>.pem )
  - connect to you remote machine through ( ssh -i "devTinder-secret123.pem" ubuntu@ec2-3-110-223-157.ap-south-1.compute.amazonaws.com ) 
  - install nvm (node version manager ) by code provided by nodejs nvm linux (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash)
  - install node version same as your local (nvm install 22.19.0)
  - clone the backend and front end from git in to new machine  
  - frontend
        - npm install 
        - then do npm run build