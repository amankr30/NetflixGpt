export const validateForm = (email,password,name,confirmPassword,isSignInForm) =>{
     email=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);
     password=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
     const isValidName = name ? /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(name) : true;
     

    if(!isSignInForm && !isValidName){
        return ("Please enter a valid name");
    }
    if(!email){
        return ("Please enter a valid email address");
    }
    if(!password){
        return ("Please enter a valid password");
    }
    // if(!isSignInForm && password !== confirmPassword){
    //     return ("Password do not match");
    // }

    return null;
}