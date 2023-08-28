# RonBot - Your Fun Discord Bot

RonBot is a fun and interactive Discord bot that can entertain your server members with jokes, quotes, and facts. It responds to specific commands and mentions.

## Features

- Responds when mentioned with available commands
- Provides jokes fetched from a joke API
- Shares Kanye West quotes using a REST API
- Offers random fun facts using an API

## Installation

If you want to change and make the bot (tailor it) to your own server needs,

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/ronbot-discord.git
   ```

2. install dependencies using npm:

    ```bash
    npm i discord.js
    ```

3. create a secretVars.js file and add it to your gitIgnore
    this is so that you can add your own bot token

    ```javascript
    export const BOT_TOKEN = 'your own bot token'
    ```

4. Run the bot

    ```bash
    node index.js
    ```

## Commands

- joke : Gets a random joke with a 20% chance of roasting the user who requested to hearing a joke
- kanye quote: Replies with a quote from kanye west
- fact: replies with a random fun fact

## Contributing

I made this bot specifically for my server, but you can use my code as a base template for your own discord bot!

## License

This project is licensed under the MIT License.
