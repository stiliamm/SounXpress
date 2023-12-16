import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const first_name = e.target.elements.firstName.value;
        const last_name = e.target.elements.lastName.value;
        const password = e.target.elements.password.value;
        handleRegistration(username, first_name, last_name, password);
    };


    const handleRegistration = async(username, first_name, last_name, password) => {
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, first_name, last_name, password}),
        });

        if (!response.ok) {
            throw new Error('Network was not ok!');
        }

        const data = await response.json();
        navigate("/login")
        return data;
    };

    return (
        <div className="register-container">
            <div className='form-box-register'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-box-register'>
                        <span className='icon'>
                        <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <input type='username' name='username' required/>
                        <label>Username</label>
                    </div>
                    <div className='input-box-register'>
                        <span className='icon'>
                        <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <input type='text' name='firstName' required/>
                        <label>First Name</label>
                    </div>
                    <div className='input-box-register'>
                        <span className='icon'>
                        <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <input type='text' name='lastName' required/>
                        <label>Last Name</label>
                    </div>
                    <div className='input-box-register'>
                        <span className='icon'>
                        <ion-icon name="key-outline"></ion-icon>
                        </span>
                        <input type='password' name='password' required/>
                        <label>Password</label>
                    </div>
                    <button type='submit' className='btn'>Sign in</button>
                </form>
            </div>
        </div>
    )
}
export default Register;