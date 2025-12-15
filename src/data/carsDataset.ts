export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  bodyType: string;
  color: string;
  image: string;
}

// Mock Stanford Cars Dataset with realistic entries
export const carsDataset: Car[] = [
  { id: 1, make: "Audi", model: "R8 Coupe", year: 2012, bodyType: "Coupe", color: "Silver", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop" },
  { id: 2, make: "Audi", model: "S4 Sedan", year: 2012, bodyType: "Sedan", color: "Black", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop" },
  { id: 3, make: "BMW", model: "M3 Coupe", year: 2012, bodyType: "Coupe", color: "White", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
  { id: 4, make: "BMW", model: "X6 SUV", year: 2012, bodyType: "SUV", color: "Black", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop" },
  { id: 5, make: "BMW", model: "Z4 Convertible", year: 2012, bodyType: "Convertible", color: "Red", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop" },
  { id: 6, make: "Chevrolet", model: "Corvette ZR1", year: 2012, bodyType: "Coupe", color: "Yellow", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { id: 7, make: "Chevrolet", model: "Camaro SS", year: 2012, bodyType: "Coupe", color: "Red", image: "https://images.unsplash.com/photo-1603553329474-99f95f35394f?w=400&h=300&fit=crop" },
  { id: 8, make: "Ferrari", model: "458 Italia", year: 2012, bodyType: "Coupe", color: "Red", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop" },
  { id: 9, make: "Ferrari", model: "California", year: 2012, bodyType: "Convertible", color: "Red", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop" },
  { id: 10, make: "Ford", model: "Mustang GT", year: 2012, bodyType: "Coupe", color: "Blue", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop" },
  { id: 11, make: "Ford", model: "F-150", year: 2012, bodyType: "Truck", color: "White", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop" },
  { id: 12, make: "Honda", model: "Civic", year: 2012, bodyType: "Sedan", color: "Silver", image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
  { id: 13, make: "Lamborghini", model: "Aventador", year: 2012, bodyType: "Coupe", color: "Orange", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop" },
  { id: 14, make: "Lamborghini", model: "Gallardo", year: 2012, bodyType: "Coupe", color: "Yellow", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop" },
  { id: 15, make: "Mercedes-Benz", model: "SLS AMG", year: 2012, bodyType: "Coupe", color: "Silver", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop" },
  { id: 16, make: "Mercedes-Benz", model: "C-Class", year: 2012, bodyType: "Sedan", color: "Black", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop" },
  { id: 17, make: "Nissan", model: "GT-R", year: 2012, bodyType: "Coupe", color: "Silver", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=300&fit=crop" },
  { id: 18, make: "Porsche", model: "911 Turbo", year: 2012, bodyType: "Coupe", color: "White", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 19, make: "Porsche", model: "Cayenne", year: 2012, bodyType: "SUV", color: "Black", image: "https://images.unsplash.com/photo-1606664949798-c7c8d6fa05a7?w=400&h=300&fit=crop" },
  { id: 20, make: "Tesla", model: "Model S", year: 2012, bodyType: "Sedan", color: "Red", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop" },
  { id: 21, make: "Toyota", model: "Supra", year: 2012, bodyType: "Coupe", color: "Orange", image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=300&fit=crop" },
  { id: 22, make: "Aston Martin", model: "V8 Vantage", year: 2012, bodyType: "Coupe", color: "Silver", image: "https://images.unsplash.com/photo-1596636478939-59fed7a083f2?w=400&h=300&fit=crop" },
  { id: 23, make: "Bentley", model: "Continental GT", year: 2012, bodyType: "Coupe", color: "Black", image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop" },
  { id: 24, make: "Jaguar", model: "XKR", year: 2012, bodyType: "Coupe", color: "Blue", image: "https://images.unsplash.com/photo-1617814076668-3dc5c477ba07?w=400&h=300&fit=crop" },
];

export const makes = [...new Set(carsDataset.map(car => car.make))].sort();
export const bodyTypes = [...new Set(carsDataset.map(car => car.bodyType))].sort();
export const colors = [...new Set(carsDataset.map(car => car.color))].sort();
export const years = [...new Set(carsDataset.map(car => car.year))].sort((a, b) => b - a);

export const getModelsByMake = (make: string): string[] => {
  return [...new Set(carsDataset.filter(car => car.make === make).map(car => car.model))].sort();
};
