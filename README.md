Memorize - exercício de memorização
==

### Configuração do Ambiente de Desenvolvimento Local (Ubuntu 12.04 LTS):

--
#### Instalar:

    sudo apt-get install mysql-server apache2 libapache2-mod-php5 php5 php5-mysql phpmyadmin 

--
#### Habilitar phpmyadmin:

    sudo ln -s /usr/share/phpmyadmin /var/www/phpmyadmin
    sudo /etc/init.d/apache2 restart

--
#### Habilitar login sem senha:

    sudo gedit /usr/share/phpmyadmin/libraries/config.default.php
    \# $cfg['Servers'][$i]['AllowNoPassword'] = true;

--
#### Configurar alias para a aplicação:

    sudo gedit /etc/apache2/sites-available/default &

    Alias /memorize "/home/user_name/Projetos/memorize/master/"
    <Directory "/home/user_name/Projetos/memorize/master/">
      Options Indexes MultiViews FollowSymLinks
      AllowOverride None
      Order deny,allow
      Deny from all
      Allow from 127.0.0.0/255.0.0.0 ::1/128
    </Directory>

    sudo /etc/init.d/apache2 restart

--
#### Configurar exibição de erros:

    sudo gedit /etc/php5/apache2/php.ini &
    \# error_reporting = E_ALL | E_STRICT
    \# display_errors = On
    \# display_startup_errors = On
    \# track_errors = On

--
#### Links:

* Demonstração: http://crisstanza.github.io/memorize/
 
