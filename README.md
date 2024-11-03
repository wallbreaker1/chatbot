# Chatbot Application

This is a simple chatbot application built with [Next.js](https://nextjs.org). The chatbot provides information about stock exchanges and their top stocks based on user input.

## How It Works

The chatbot uses a state management system to track the current conversation step, represented by the `step` state. Based on the parameters of this state, the bot sends appropriate messages to the user.

1. **Selecting an Exchange**: Initially, the bot prompts the user to select a stock exchange by its code.
2. **Selecting a Stock**: Once an exchange is selected, the bot presents the top stocks for that exchange, allowing the user to select one for price information.
3. **Navigating Back**: Users can navigate back to the previous step to select a different stock or exchange.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
