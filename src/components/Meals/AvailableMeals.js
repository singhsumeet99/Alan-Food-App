import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

export const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Pizza',
      description: 'Cheese, capsicum, olive, corn,onion',
      price: 179,
    },
    {
      id: 'm2',
      name: 'Sandwich',
      description: 'Grilled one!',
      price: 80,
    },
    {
      id: 'm3',
      name: 'Burger',
      description: 'Veg, MacTiki, Meaty',
      price: 60,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 70,
    },
  ];

const AvailableMeals =() => {
    const mealsList=DUMMY_MEALS.map((meal) =>
        <MealItem 
        
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price} />);

    return (
        <section className={classes.meals}>
            <ul>
                <Card>{mealsList}</Card>
            </ul>
        </section>
    )
};

export default AvailableMeals;
