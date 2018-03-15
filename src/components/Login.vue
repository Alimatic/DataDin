<template>
  <div class="container-fluid">

    <div class="container">
      <div class="row">
        <div class="" style="width: 400px;margin-right: auto;margin-left: auto;">

          <h1 class="text-center login-title">Entrar al sistema</h1>
          <div class="account-wall">
            <form @submit.prevent="authenticate()" class="form-signin login-form" style="text-align: center;">

              <input v-model="auth.email" type="text" class="form-control" value="" required="required"
                     placeholder="Correo"/>

              <input v-model="auth.password" type="password" class="form-control" required="required"
                     placeholder="Contrasena"/>

              <input class="btn btn-lg btn-primary btn-block" type="submit" id="_submit" name="_submit" value="Entrar"/>

            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading, .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .account-wall {
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .login-title {
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
  }

  .profile-img {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .need-help {
    margin-top: 10px;
  }

  .new-account {
    display: block;
    margin-top: 10px;
  }
</style>

<script>
  // import router from '../router'

  export default {
    data () {
      return {
        auth: {email: '', password: ''},
        user: {}
      }
    },
    methods: {
      /**
       * Attempts to authenticate the user
       *
       * @return {mixed}
       */
      authenticate () {
        let credentials = this.auth
        this.$http.post('http://192.168.100.5:80/datadin2/login', {
          I: credentials.email,
          A: credentials.password
        }).then((response) => {
          /**
           * Now that we successfully retrieved the token and the user information
           * we have a couple of options:
           *
           *     1) Save the token in local storage
           *         - Keeps the token saved even when the browser is closed
           *     2) Save the token in session storage
           *         - Deletes the token when user closes the browser or even the tab
           *     3) Save the token in a cookie
           *
           *  Both local and session storage api are the same so I'll use the local storage
           *  for the sake of the example
           *
           */
          if (response.data.Token) {
            window.localStorage.setItem('token', response.data.Token)

            if (parseInt(response.data.Tag) === -1) {
              window.localStorage.setItem('role', 'admin')
            } else {
              window.localStorage.setItem('role', 'manager')
            }
            // window.localStorage.setItem('auth-user', JSON.stringify(response.data.user))

            window.location.href = ''
          } else {
            alert('Usuario o password incorrecto')
          }
          // this.$route.router.go({name: 'edit'})
        }).catch((errors) => {
          // alert('Servidor no disponible')
          // catch errors
        })
      }
    }
  }
</script>
