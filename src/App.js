import { useState } from 'react';
import './App.css';
import Logo1 from './Photo/Icon.png'
import Logo2 from './Photo/Icon2.png'
import Visa from './Photo/image3.png'

function App() {

  var CardsInfo = [{
    Name: "alena kondrashkina",
    CardNumber: "0455  1942 0968 1204",
    ExpDate: "09.09.2023",
    CVC: 909,
    CardType: "Visa"
  },
  {
    Name: "mikhail Pavlovich",
    CardNumber: "5678  3456 1244 3214",
    ExpDate: "19.02.2023",
    CVC: 923,
    CardType: "MasterCard"
  },
  {
    Name: "daria ivanova",
    CardNumber: "1255 3462 2356 2367",
    ExpDate: "29.11.2022",
    CVC: 124,
    CardType: "Mir"
  }]


  var [Page, setPage] = useState("Payment")
  var [CurrentCardInfo, setCurrentCardInfo] = useState(0)
  var [Check, setCheck] = useState(false)

  var [x, setx] = useState(375)
  var [scroll, setscroll] = useState(0)

  var OnFirstTouch = (e) => {
    e.persist()
    setx(e.touches[0].clientX)
  }

  var OnMove = (e) => {
    e.persist()
    let x2 = e.touches[0].clientX
    setscroll(((x2 - x) / document.getElementById('PaymentScreen').offsetWidth * 100))
  }

  var OnTouchEnd = () => {

    var OnLeft = () => {
      setscroll(scroll-=2)
      console.log(scroll)
      if (scroll <= -187) {
        clearInterval(Interval)
        setCurrentCardInfo(CurrentCardInfo + 1)
        setscroll(0)
      }
    }

    var OnRight = () => {
      setscroll(scroll+=2)
      console.log(scroll)
      if (scroll >= 187) {
        clearInterval(Interval)
        setCurrentCardInfo(CurrentCardInfo - 1)
        setscroll(0)
      }
    }

    var SetZeroRightInterval = () =>{
      setscroll(scroll-=2)
      console.log(scroll)
      if (scroll <= 0) {
        clearInterval(ZeroRightInterval)
        setscroll(0)
      }
    }

    var SetZeroLeftInterval = () =>{
      setscroll(scroll+=2)
      console.log(scroll)
      if (scroll >= 0) {
        clearInterval(ZeroLeftInterval)
        setscroll(0)
      }
    }

    if (scroll < -50) {
      if (CurrentCardInfo == CardsInfo.length - 1) {
        var ZeroLeftInterval = setInterval(SetZeroLeftInterval, 5)
        return
      }
      var Interval = setInterval(OnLeft, 5)
    }

    if (scroll > 50) {
      if (CurrentCardInfo == 0) {
        var ZeroRightInterval = setInterval(SetZeroRightInterval, 5)
        return
      }
      var Interval = setInterval(OnRight, 5)
    }

    if(scroll < 80 && scroll > -80){
      if(scroll>0){
        var ZeroRightInterval = setInterval(SetZeroRightInterval, 5)
      }
      if(scroll<0){
        var ZeroLeftInterval = setInterval(SetZeroLeftInterval, 5)
      }
    }
  }

  var settings = {
    'width': CardsInfo.length * 375 + 'px',
    "left": CurrentCardInfo * -375 + scroll * 2 + 'px'
  }


  return (
    <div className="App">
      <div className="Phone">
        <div className="Mono">
          <div className="Camera"></div>
          <div className="Dynamic"></div>
        </div>
        <div className="PaymentScreen" id="PaymentScreen">

          <div className="FirstRowContainer">
            <div className="FirstRow">
              <div className="Info">&larr;</div>
              <div className={Page === "Shipping" ? "ActiveInfo" : "Info"} onClick={() => setPage("Shipping")}>Shipping</div>
              <div className={Page === "Payment" ? "ActiveInfo" : "Info"} onClick={() => setPage("Payment")}>Payment</div>
              <div className={Page === "Summary" ? "ActiveInfo" : "Info"} onClick={() => setPage("Summary")}>Summary</div>
              <div className="Info">&rarr;</div>
            </div>
          </div>

          <div className="Cards" id="Cards" style={settings} onTouchStart={OnFirstTouch} onTouchMove={OnMove} onTouchEnd={OnTouchEnd}>
            {CardsInfo.map((u, index) => (
              <div className={`Card${index}`}>
                <div className="Logos">
                  <img src={Logo1}></img>
                  <img src={Logo2}></img>
                </div>
                <img src={Visa} className="Visa"></img>
                <div className="Number">
                  **** **** **** {u.CardNumber.substr(u.CardNumber.length - 4)}
                </div>
                <div className="Name">
                  {u.Name}
                </div>
              </div>
            ))}
          </div>

          <div className="PaymentInfoContainer">
            <div className="PaymentInfo">
              <div className="InputLabel">Cardholders Names</div>
              <div className="InputForm">
                <input className="PaymentInfoInput" value={CardsInfo[CurrentCardInfo].Name}></input>
                <div>{CardsInfo[CurrentCardInfo].Name ? <div className="PaymentGoodCheck">&#10004;</div> : <div className="PaymentBadCheck">&#10006;</div>}</div>
              </div>
              <div className="InputLabel">Card Number</div>
              <div className="InputForm">
                <input className="PaymentInfoInput" value={CardsInfo[CurrentCardInfo].CardNumber}></input>
                <div>{CardsInfo[CurrentCardInfo].CardNumber ? <div className="PaymentGoodCheck">&#10004;</div> : <div className="PaymentBadCheck">&#10006;</div>}</div>
              </div>
              <div className="DubbleInput">
                <div>
                  <div className="InputLabel">Exp Date</div>
                  <div className="InputForm">
                    <input className="PaymentInfoInput" value={CardsInfo[CurrentCardInfo].ExpDate}></input>
                    <div>{CardsInfo[CurrentCardInfo].ExpDate ? <div className="PaymentGoodCheck">&#10004;</div> : <div className="PaymentBadCheck">&#10006;</div>}</div>
                  </div>
                </div>
                <div></div>
                <div>
                  <div className="InputLabel">CVC</div>
                  <div className="InputForm">
                    <input className="PaymentInfoInput" value={CardsInfo[CurrentCardInfo].CVC} type="password"></input>
                    <div>{CardsInfo[CurrentCardInfo].CVC ? <div className="PaymentGoodCheck">&#10004;</div> : <div className="PaymentBadCheck">&#10006;</div>}</div>
                  </div>
                </div>
              </div>
              <div className="Check">
                <div className={Check ? "GoodCheckBox" : "CheckBox"} onClick={() => {
                  setCheck(!Check)
                }}>{Check ? <div className="PaymentGoodCheckForCheckBox">&#10004;</div> : <div></div>}</div>
                <div className="CheckLabel">Save your card information. Its safe!</div>
              </div>
              <div className="TotalAmount">Total amount payable</div>
              <div className="Price">$400.00</div>
              <div className="PayButton">Pay now</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
