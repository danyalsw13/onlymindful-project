import React, { useEffect } from 'react';
import './PricingTable.css';

import db from '../firebase'

import {useState} from 'react'

import {useSelector} from 'react-redux';

import {selectUser} from '../features/userSlice';

import {loadStripe} from "@stripe/stripe-js";

const PricingTable = () => {
 

  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);


  const [isCancelled, setIsCancelled] = useState(true);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get() 
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {

          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
            status: subscription.data().status
          });
          // ...
        });
      });
  }, [user.uid]);



  //have use effect and fetch the plans from
  //firestore database that went into the stripe 
  // and load up on the screen

    useEffect(() => {
      db.collection('products')
      .where('active', '==', true)
      .get().then(querySnapshot => {
        const products = {};
        querySnapshot.forEach(async productDoc => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
         priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),

          }
         })
        });
        setProducts(products);
      });
    }, []);

 //   console.log(products)


const loadCheckout = async (priceId) => {
//rendering the list out
const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({

  price: priceId,
  success_url: window.location.origin,
  cancel_url: window.location.origin,


      });

      docRef.onSnapshot(async(snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
          // show an error to your customer and
          // inspect your cloud function logs in
          // the firebase console
          alert(`An error occured: ${error.message}`);

        }

        if (sessionId) {
          // we have a session, let's redirect to Checkout
          // Init Stripe

          const stripe = await loadStripe("pk_live_51NGF8aCRgk9FPALejBnb4D2bmQGQD1LfndGIri9m0z0HxgX8uD7TLyDG5XsErcnmr6NfL2lJohmzSFvzwtgu01iw00zmWtMU3Z");
           
          
            stripe.redirectToCheckout({sessionId});

        }

      });

};



//process of cancelling user subscription




/*
const sendToCustomerPortal = async() => {
  const functionRef = functions.httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
const { data } = await functionRef({ returnUrl: window.location.origin });
window.location.assign(data.url);
}
*/

const redirectToStripePortal = () => {
  const successUrl = encodeURIComponent(window.location.href);
  const cancelUrl = encodeURIComponent(window.location.href);
  const stripePortalUrl = `https://billing.stripe.com/p/login/7sI7u63vfbG8gGA288?success_url=${successUrl}&cancel_url=${cancelUrl}`;
  window.location.href = stripePortalUrl;

}

useEffect(() => {
  const fetchData = async () => {
    try {
      const querySnapshot = await db
        .collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get();

      querySnapshot.forEach(async (subscription) => {
        const subscriptionData = subscription.data();
       

        // Check if the cancellation status has changed
        
        // check if the subscription status is cancelled
        const status = subscriptionData.status
     //   console.log("status: ", status)
        // stores an object, how to get a string?
        if (status === 'canceled') {
          // Subscription is canceled at the period end
      //    console.log("Subscription is canceled at the period end");
          setIsCancelled(true);
          
        } else {
          // Subscription is active
        //  console.log("Subscription is active");
          setIsCancelled(false);

        }

        
        
       


      });
    } catch (error) {
      alert.message("Error fetching subscription data", error)
    //  console.error("Error fetching subscription data:", error);
    }
  };

  fetchData();
}, [user.uid]);



//get time from server-side and then
//compare it with current package end date
//and then store the status of the subscription
//and send it to userSlice
// server.js


  return (
    <div className="pricing-table">
      <div className= "pricing-plan">
      <h2 className="plan-name">Free Plan</h2>
  <p className="plan-price">  <span className="price-value">
      </span> 
       </p> 
       <ul className="plan-features">
         <li>✔️ {"120"} max tokens each prompt </li>
         <li>✔️ Real-time Powerful Response</li>
         <li>❌ {"175"} max tokens each prompt </li>
         <li>❌ Long Paragraph Personalized Response</li>

        

       </ul>
       </div>
      {!isCancelled && subscription && (<p className="renew">
        Renewal date: {""} 
        {new Date(
          subscription?.current_period_end * 1000).toLocaleDateString()}
          </p>)}
     {Object.entries(products).map(([productId, productData]) => {
       const isCurrentPackage = isCancelled ? null :  productData.name?.toLowerCase().includes(subscription?.role);
    
    
       //  console.log("isCurrentPackage", isCurrentPackage)
     //  console.log("isCancelled: ", isCancelled)
       //  dispatch(setSubscriptionStatus(isCurrentPackage));
    // handleSubscriptionStatus(isCurrentPackage);



    return(

        <div key={productId} className={`${isCurrentPackage && "pricing-plan-disabled"} 
        pricing-plan`}>
         
       <h2 className="plan-name">{productData.name}</h2>
       <p className="plan-price">  <span className="price-value">
       {productData.name === "Upgrade Plan" ? "$19" : "$12"}</span> 
        <span className="price-period"> / month</span>
       </p> 
       <ul className="plan-features">
         <li>✔️ {productData.name === "Upgrade Plan" ? "300" : "175"} max tokens each prompt </li>
         <li>✔️ Fine-tuned for Personalized Response</li>
         <li>✔️ Real-time Powerful Response</li>
         <li>✔️ Private Generation </li>

       </ul>
       <button className="plan-button"
      onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
        { isCurrentPackage ? 'Your Current Package' : 'Subscribe'}</button>
       
       
        <div>
        {isCurrentPackage && (<button className="plan-button"
      
      
      onClick={ redirectToStripePortal}>
        Manage Subscription
        </button>)}
   
       </div>
     
       
       
     </div>
     
       )

     })}


    </div>
  );
};


export default PricingTable;


