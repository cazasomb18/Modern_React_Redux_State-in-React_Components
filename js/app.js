//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//THE RULES OF REACT'S STATE SYSTEM
	//Only usable with class components
	//You will confuse props with state :(
	//'STATE' is a JS object that contains data relevant to a component
		//***in our case we have one piece of state that is relevant (user's latitude)
	//Updating 'STATE' on a component causes the component to (almost) rerender
		//This is the KEY to getting  COMPONENT to RERENDER
	//State must be initialized when a component is created
	//State can ONLY be updated using the function 'setState'
		//you cannot update state the way that you're accustomed to with JS




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Initializing State Through Constructors
	

	//In our <App/> component, we already have one method, the render(){} method
		//this is a requirement of ReactJS, if we don't define it React throws an error

	Constructor(props){}
		//in a JS class the constructor(){} is automatically called before anything else
		//Therefore this is a good location to initialize state.
		//Automatically called w/ props object ==> constructor(props){}

	super(props);
		//Our app component is extending/borrowing functionality from the 'React.Component' base class
		//'React.component' has constructor function of its own that sets up a React Component for us
		//When we define a constructor function we are overriding/replacing that base constructor
			//super(props); makes sure that the component still has access to that base constructor
			//by providing a reference to the parent's constructor
				//that's all super(props) is ... a reference to the parent's constructor that ensures
				//we have all of the React.Component built in functionality.
				//We have to do this every single time we define a constructor.

	this.state = { lat: null};
		// ^^^ under super(props) we initialize state^^^
		//We're creating a JS object with a key of 'lat', and we initialize the first value as null
			//NULL b/c we expect the value to be a number and we have no data yet, must always anticipate the type of data.



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Updating State Properties
	//NULL is in initialization b/c we dont' know the value yet and we expect it to be a number
	//in the render(){ return ()} block we reference this like so: {this.state.lat}
		//DO NOT INITIALIZE REQUESTS/WORK IN THE RENDER METHOD
		//This is b/c render will be called CONSTANTLY

	//SYNTAX, refactoring first navigator callback: 
		position => { 
			this.setState({ lat: position.coords.latitude })

		};
			//We Wrap the 'lat' key value in {} b/c we're referencing the JS position object

	this.setState({ lat: position.coords.latitude })
		//SYNTAX, referencing the state that we had set in the constructor
	this.state.late = position.coords.latitude;
	//DO NOT DO THIS!!! We never directly assign value to our state object, we always call setState()
		//THE ONLY EXCEPT TO THIS IS WHEN YOU INITIALIZE STATE IN the constructor(){}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//App Lifecycle Walkthrough

	//JS File loaded by browser and then executed

	//A new instance of app component is created

	//App Components constructor(){} method is called

	//State object is created and assigned to the 'this.state' property

	//We call geolocation service
		//Call back function will not be called until we eventually return from the constructor(){}
			//We'll run super(props), then this.state = { lat: null };, then getCurrent Position(), give it the callBack,
				//THEN we return from the constructor(){}, callback will not run until we successfully fetch our position

	//App returns to JSX, gets rendered page as HTML*** (1st render)

	//We get the result of our geolocation!
		//execute callback, take position object, pull latitude out of it

	//We update our state object with a call to  'this.setState()'

	//React sees that we updated the state of a component

	//React calls our 'render' method a second time

	//Render method returns some (updated) JSX*** (2nd render)

	//React takes that JSX and updates content on the screen

//What's important to understand here is that our app was rendered two times ***




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Handling Errors Gracefully - refactoring the navigator failure cb to display content to the user
	err => {
		this.setState({ errorMessage: err.message })
	};
		//here, we're setting state with the default error message from the navigator {}
	Error: {this.state.errorMessage}
		//here we're referencing that state that we had set in the constructor(){} in the render(){}
		
		//goal next time is to show an error message if there is an error and show nothing if there is no error





//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONDITIONALLY RENDERING CONTENT
	//Here's what we want to do based on the latitude
		//Have latitude + no error message === show latitude
		//No latitude + have error message === show error
		//No latitude + no error message === show 'loading'


	//in render(){}
		//in order to conditionally return some JSX, we just need some 'if' statements into the render method
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>
		}

		if (!this.state.errorMessage && this.state.lat) {
			return <div>Latitude: {this.state.lat}</div>
		}

		return <div>Loading!</div>

		