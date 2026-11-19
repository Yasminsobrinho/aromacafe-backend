import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';

// Lê os JSON da pasta seed
const foods = JSON.parse(readFileSync('seed/foods.json', 'utf8'));
const drinks = JSON.parse(readFileSync('seed/drinks.json', 'utf8'));

await mongoose.connect(process.env.MONGODB_URI);

// Os nomes das coleções seguem os models: Food -> foods, Drink -> drinks
await mongoose.connection.collection('foods').deleteMany({});
await mongoose.connection.collection('foods').insertMany(foods);
await mongoose.connection.collection('drinks').deleteMany({});
await mongoose.connection.collection('drinks').insertMany(drinks);

console.log(
  `Seed concluído: ${foods.length} comidas e ${drinks.length} bebidas.`,
);
await mongoose.disconnect();
