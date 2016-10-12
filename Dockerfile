# This image will be based on the official nodejs docker image
# FROM node:latest
# The most recent node release (7 days ago from March 1st, 2016) broke the clean:dist step
FROM node:0.12.9

# Set in what directory commands will run
WORKDIR /home/app

# Put all our code inside that directory that lives in the container
ADD . /home/app

# Install dependencies
RUN \
    apt-get update && \
    apt-get install ruby-dev -y && \
    apt-get install rubygems -y && \
    gem install compass --no-ri --no-doc && \
    npm install -g grunt-cli && \
    npm install -g bower && \
    npm install && \
    bower install --config.interactive=false --allow-root && \
    grunt ${ENV}

# Tell Docker we are going to use this port
EXPOSE 9010

# The command to run our app when the container is run
# CMD ["grunt", "serve:dist"]
# CMD ["grunt", "serve:qa"])
# CMD ["sh", "-c", "grunt serve:${ENV}"]
# CMD ["sh", "-c", "grunt serve:dist"]
CMD ["sh", "-c", "grunt serve"]
