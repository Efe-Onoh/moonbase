var webstore = new Vue({
    // The 'option object': DOM mounting point
    el: '#app',
    data: {
        sitename: 'Moonbase',
        username: '',
        signup:{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            country: ''
        },
        signin: {
            email: '',
            password: ''
        },
        
        donate:{
            paymenttype: 'card',
            phone: '',
            amount: 1,
        },
        cardDetails:{
            cardName: '',
            cardNumber: '',
        },
        project:{
            category: '',
            desc: '',
            locationstate: '',
            locationregion: '',
            email: ''
        },
        errors: [],
    },

    created: function() {

        if ((localStorage.user == null)){
            localStorage.clear();
        }
        else{
            this.username = localStorage.user;

        }
        
        
        

        
    },
    methods: {
        nextSignUp(){
            document.getElementById("sign-up-form-one").classList.add("hidden");
            document.getElementById("sign-up-form-two").classList.remove("hidden");
        },

        prevSignUp(){
            document.getElementById("sign-up-form-one").classList.remove("hidden");
            document.getElementById("sign-up-form-two").classList.add("hidden");
        },

        signUpSubmit(){

            
            const newUser = { firstName: this.signup.firstName, lastName: this.signup.lastName, email: this.signup.email, password: this.signup.password, country: this.signup.country };

            //on submit, post / create a new entry in orders collection
            fetch('https://project-moon-base.herokuapp.com/collection/users', {
                  method: 'POST',
                  headers: {
                          'Content-Type': 'application/json', // set the data type as JSON
                  },
                  body: JSON.stringify(newUser) //maybe change this to regular json object
                  })
                  .then(response => response.json())
                  .then(result => {
                  alert("Account created successfully");
                  console.log('Success:', result);
                  localStorage.user = newUser.firstName;
                  location.replace("./dashboard.html");
                  
               
                  })
                  .catch(error => {
                  console.error('Error:', error);
                  });

                  this.signup.firstName = null;
                  this.signup.lastName = null;
                  this.signup.email = null;
                  this.signup.password = null;
                  this.signup.country = null;

        },

        signInSubmit(){
            let cred = this.signin;
            
            

            fetch('https://project-moon-base.herokuapp.com/collection/users/'+cred.email).then( //get from users on submit and output the response
                (res)=> {
                    res.json().then(
                        (json)=> {

                            alert("valid email");
                            if (json.password == cred.password)
                                {
                                    alert("signing in....");

                                    localStorage.user = json.firstName; 
                                    location.replace("./dashboard.html");
                                    
                                } 
                            else {
                                    alert("invalid password");
                            }
                        });
                });
                

        },

        projectSubmit(){

            const newProject = { category: this.project.category, description: this.project.desc, email: this.project.email, location: this.project.locationstate+this.project.locationregion };

            //on submit, post / create a new entry in orders collection
            fetch('https://project-moon-base.herokuapp.com/collection/projects', {
                  method: 'POST',
                  headers: {
                          'Content-Type': 'application/json', // set the data type as JSON
                  },
                  body: JSON.stringify(newProject) //maybe change this to regular json object
                  })
                  .then(response => response.json())
                  .then(result => {
                  alert("project stored successfully");
                  console.log('Success:', result);
                  })
                  .catch(error => {
                  console.error('Error:', error);
                  });

                  this.project.category = null;
                  this.project.desc = null;
                  this.project.email = null;
                  this.project.locationstate = null;
                  this.project.locationregion = null;

        },
        signOut(){
            localStorage.clear(); //reclaim local storage
            location.replace("./index.html");
        },
        validateSignUp(){

            /*create two regular expressions to check the correct pattern is being entered for name and phone number*/
            //let phoneRegex =  /^[0-9]{9,11}$/g;
            let nameRegex = /^[A-Za-z]+$/ig;

            /*create a boolean test to see if phone number and name have been entered and are valid*phoneRegex.test(this.order.phone)&& nameRegex.test(this.order.name)*/
            let val = (this.signup.firstName != '') && (this.signup.lastName != '') && (this.signup.email != '') && (this.signup.country != '') && (this.signup.password != '') && (this.validateCard());

            console.log(val);

            /*test validity. and return true if valid*/
            if (val){
                return 1;    //not entering. why? because of order of eval. stored in a variable and it worked.
            }

                
            return 0;

                
        },

        validateDonate(){
           
            if(this.donate.paymenttype=='card'){
                return this.validateCard();
            }

            else{
               return this.validatePhoneNum();
    
            }
           
            /*test validity. and return true if valid*/
            if (val){
                return 1;    //not entering. why? because of order of eval. stored in a variable and it worked.
            }

                
            return 0;

        },

        validatePhoneNum(){
             /*create two regular expressions to check the correct pattern is being entered for name and phone number*/
             let phoneRegex =  /^[0-9]{9,11}$/g;
             /*create a boolean test to see if phone number and name have been entered and are valid*/
             let val = phoneRegex.test(this.donate.phone) && (this.donate.paymenttype == 'mobile');

             console.log(val);

             /*test validity. and return true if valid*/
             if (val){
                 return 1;    //not entering. why? because of order of eval. stored in a variable and it worked.
             }

                 
             return 0;


        },

        validateCard(){
            /*create two regular expressions to check the correct pattern is being entered for name and phone number*/
            let cardNameRegex = /^[A-Za-z]+\s{1}[A-Za-z]+$/ig;
            let cardNumRegex =  /^[0-9]{3,4}\-?[0-9]{3,4}\-?[0-9]{3,4}\-?[0-9]{3,4}$/g;
            /*create a boolean test to see if phone number and name have been entered and are valid*/
            let val = cardNumRegex.test(this.cardDetails.cardNumber) && cardNameRegex.test(this.cardDetails.cardName);

            console.log(val);

            /*test validity. and return true if valid*/
            if (val){
                return 1;    //not entering. why? because of order of eval. stored in a variable and it worked.
            }

                
            return 0;
        },

        successfulAlert(x){
            alert(x);
        },

        access(){

            if(this.username != ''){ //set access to true or false depending on if a username exists
                this.access = true;
            }
            else{
                this.access = false;
            }
        },
        
    }

})