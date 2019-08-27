## --Working Title-- CSV to MySQL Parser


Stated the project to work with MySQL and server-side Nodejs.

I wanted to make a application, that could get all my songs into a Database.
I wanted to have different entries to the server, so I could use the URL as a command line.

So I made some routes from express that could handle each command.

## Required libraries / used

  - node-fech
  - express
  - mysql

## Local SQL database
  In this project I used XAMPP to run a apache server and a MySQL database.
  But you can use any MySQL database. But I found it was quickest way to run it with XAMPP.
  You only have to install XAMPP, and click a couple of buttons.

  NOTE: In "httpd.conf" file you can specify another path, when running node, with ProxyPass. \n
  ServerRoot "F:/XAMPP/apache"
  ProxyPass /node http://localhost:3000

  Also enable these files by removing the "#" in front, in the same document as above.
  LoadModule proxy_module modules/mod_proxy.so
  LoadModule proxy_ajp_module modules/mod_proxy_ajp.so

  This will allow it to load the proxy node server smoothly.


## License

Free to use, wherever you find it useful.
