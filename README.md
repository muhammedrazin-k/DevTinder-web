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

    -so now we want to host our front end so we use nginx
        - write "sudo apt update" for updating all our dependencies like ubunto version etc..
        - write "sudo apt install nginx" for installing nginx
        - write "sudo systemctl start nginx" to start nginx
        - write "sudo systemctl enable nginx" to enable nginx
        - while doing like enabling nginx they make path in nginx known as /var/www/html/ (we want to copy our dist folder and paste here)
        - we want copy our dist folder and paste it into /var/www/html/ with the writting code of (" sudo scp -r dist/*  /var/www/html/ ") 
        - enable port :80 of your instance in aws 


  - backend
        -allowed ec2 instance ip on mongo db server
        - npm i pm2 -g
        - pm2 start npm -- start
        - pm2 logs
        - pm2 list ,pm2 flush <name>, pm2 stop <name>, pm2 delete <name>


    frontend running = http://3.108.252.209  (this was temporary each time running instance it will change)
    backend running = http://3.108.252.209:3000/    (this was temporary each time running instance it will change)


    map :3000 to /api via through nginx 
    -------------------------------------

        - go to nginx site-available folder to map :3000 to /api  (sudo nano /etc/nginx/sites-available/default)



    nginx config:

    server_name 3.108.252.209;

    location /api/ {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://localhost:3000;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

        - then resart nginx = sudo systemctl restart nginx 



# Adding custome Domain name

    - purchased domain name from godaddy
    - signup on cloudflare & add new domain name
    - change the name server on godaddy and point it to cloudflare
    - wait for sometime till your  nameserver are updated
    - DNS record: A devTinder.in  43.204.96.49
    - enable ssl for website 


# sending email via SES 
    - create an IAM user
    - give access to amazon SESfullAccess
    - Amazon SES: create an identity
    - verify your domain name
    - verify an email address identity
    - install AWS SDK v3 (from git hub documents)
    - Setup SES client 
    - Access credentials should be created in IAM under security credentials tab
    - and the credentials to the env files 
    - write code for SES client 
    - Write code for Sending Email address
    - Make the email dynamic  by passing more params to the run function


# Scheduling cron jobs in node js
    -installing node-crone
    - learning about cron expressions syntax - crontab-guru
    - schedule a job
    - learn about date-fns
    - find all the unique emailId who have got connection request in previous day
    - send Email
    - explore queue mechanisms to send bulk emails (explore bee quee and bull) 
    - explore amazone ses bulk emails

# Razorpay payment integration
    - sign up on Razorpay & complete KYC
    - created a ui for premium page
    - creating an api for create order in backend
    - initialized razorpay in utils
    - added key and secret in evn files
    - creating order on razorpay 
    - create schema and modal 
    - save the order in payment collection 
    - make the api dynamic
    - set up webhook on your live Api  (not the localhost)