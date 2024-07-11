import React, { Component } from 'react';
import facebook from '../../Assets/logo.png'; // Assuming you have the Facebook logo image

class FacebookLogin extends Component {
    componentDidMount() {
        // Load the Facebook SDK asynchronously
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1933023657117855', // Replace with your Facebook App ID
                cookie: true,
                xfbml: true,
                version: 'v12.0' // Replace with the Facebook SDK version you want to use
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    facebookLogin = () => {
        window.FB.login(
            function (response) {
                this.statusChangeCallback(response);
            }.bind(this),
            { scope: 'email,user_work_history,user_education_history,user_location,public_profile' }
        );
    }

    checkLoginState() {
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('User is not authorized');
        } else {
            console.log('User is not logged into Facebook');
        }
    }

    fetchDataFacebook = () => {
        window.FB.api('/me', function (user) {
            console.log('Successful login for: ' + user.name);
            alert('Successful login for: ' + user.name);
            // You can do more with the user object here
        });
    }

    render() {
        return (
            <img src={facebook} alt="Facebook Login" onClick={() => this.facebookLogin()} />
        );
    }
}

export default FacebookLogin;
