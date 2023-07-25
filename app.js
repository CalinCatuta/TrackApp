// Tracker class
class TrackerCalories{
    constructor(){
        this._caloriesLimit = 2000
        this._totalCalories = 0
        this._meals = []
        this._workouts = []

        this._displayCaloriesProgress()
        this._displayCaloriesRemaining()
        this._displayCaloriesConsumed()
        this._displayCaloriesTotal()
        this._displayCaloriesLimit()
        this._displayCaloriesBurned()
    }
    // Plubic methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories += meal.calories
        this._render()
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        this._render()
    }
    // Private methods
    _displayCaloriesTotal(){
        const caloriesTotalEl = document.querySelector('.total-calories')
        caloriesTotalEl.innerHTML = this._totalCalories
    }

    _displayCaloriesLimit(){
        const caloriesLimitEl = document.querySelector('.calories-limit')
        caloriesLimitEl.innerHTML = this._caloriesLimit
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.querySelector('.meal')
        // reduce(total va fi 0 la prima rulare setat de noi  si se va aduna cu meal.calories.)
        // total va primi valoarea calcului iar daca vor fi mai multe meal total va fi rezultatul anterior a calcului. 0 + 100 = 100. daca sunt 2 mese 100 + a doua masa = ...
        const caloriesConsumed = this._meals.reduce((total,meal) => total + meal.calories, 0)

        caloriesConsumedEl.innerHTML = caloriesConsumed
    }
    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.querySelector('.workout')
       
        const caloriesBurned = this._workouts.reduce((total,workout) => total + workout.calories, 0)

        caloriesBurnedEl.innerHTML = caloriesBurned
    }
    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.querySelector(".calories-remaining")

        const remaining = this._caloriesLimit - this._totalCalories
        caloriesRemainingEl.innerHTML = remaining
    }
    _displayCaloriesProgress(){
        const progresEl = document.querySelector("#calorie-progress")
        const percentage = (this._totalCalories / this._caloriesLimit) * 100
        const width = Math.min(percentage, 100)
        progresEl.style.width = `${width}%`
    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayCaloriesProgress()
    }
}



class Meal{
    constructor(name,calories){
        this.name = name
        this.calories = calories
    }
}
class Workout{
    constructor(name,calories){
        this.name = name
        this.calories = calories
    }
}

class App{
    constructor(){
        this._tracker = new TrackerCalories()

        document.querySelector('.meal-form').addEventListener('submit', this._addNewMeal.bind(this))
        document.querySelector('.workout-form').addEventListener('submit', this._addNewWorkout.bind(this))
    }

    _addNewMeal(e){
        e.preventDefault()

        const name = document.querySelector('.meal-name')
        const calories = document.querySelector('.meal-calories')

        if(name.value === "" || calories.value === ""){
            alert("Add meal name and calories")
            return
        }
        const meal = new Meal(name.value, +calories.value)

        this._tracker.addMeal(meal)

        name.value = ""
        calories.value =""
    }
    _addNewWorkout(e){
        e.preventDefault()

        const name = document.querySelector('.workout-name')
        const calories = document.querySelector('.workout-calories')

        if(name.value === "" || calories.value === ""){
            alert("Add workout name and calories")
            return
        }

        const workout = new Workout(name.value, +calories.value)

        this._tracker.addWorkout(workout)

        name.value = ""
        calories.value =""
    }
}

const app = new App()