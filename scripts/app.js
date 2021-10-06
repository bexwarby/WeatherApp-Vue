/* Header component */
const Header = {
    template: `
         <div class="header">
             <h1 class="leftContent">NETPRIME+</h1>
             <p class="rightContent">Le plateforme video complètement originale</p>
         </div>
         `
    ,
}
/* Intro component */
const Intro = {
    template: `
        <div class="abonnement">
            <p class="formules">NOS FORMULES D'ABONNEMENT</p>
            <p class="payment">
                Toutes nos formules d'abonnement sont 100% sans </br>
                engagement et résiliables à tout moment. Paiement par </br>
                CB, PayPal et en Bitcoin possible.
            </p>
        </div>
    `,
}
/* Main info component - 3 cards */
const MainInfo = {
    props: ['title', 'type', 'video', 'price'],
    template: `
        <div class="mainBody">
        
            <div class="card">
                <p class="discover"><b>{{title}}</b></p>
                <div class="type">
                    <p>{{type}}</p>
                    <p>{{video}}</p>
                </div>
                <p class="price">{{price}}</p>
                <button class="abonner" @click="savoir">S'ABONNER</button>
            </div>
        </div>
    `,
}
/* Footer component */
const Footer = {
    template: `
        <div class="footer">
            <p class="leftText">NETPRIME+</p>
            <p>&copy; Tous droits réservés</p>
        </div>  
    `,
}
/* MAIN COMPONENT */
const Component = {
    components: {
        "header-add": Header,
        "intro-paragraph": Intro,
        "main-info": MainInfo,
        "foot-add": Footer
    }
};
const app = Vue.createApp(Component)
const vm = app.mount('#go');