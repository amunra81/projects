module Play.InitialState where

import Data.HotBox
import qualified Data.List as List
import Data.Maybe 

-- MENUS

mapProduct xs =  map (\(i,n) -> Product (ProdId i) n) zs
              where zs = List.zip [1..] xs

menu0 = mapProduct
        ["Caffè Americano" ,"Café Cubano" ,"Caffè crema" ,"Cafe Zorro" ,"Doppio" ,"Espresso Romano" ,"Guillermo"
        ,"Ristretto" ,"Antoccino" ,"Breve" ,"Café bombón" ,"Cappuccino" ,"Cortado" ,"Latte" ,"Espressino" ,"Flat white"
        ,"Galão" ,"Macchiato" ,"Wiener or Viennese melange" ,"Café au lait" ,"Ca phe sua da" ,"Egg coffee" ,"Eggnog latte"
        ,"Eiskaffee" ,"Kopi susu" ,"White coffee" ,"White coffee (England)" ,"Vienna coffee" ,"Espresso con panna" ,"Coffee with espresso"
        ,"Coffee with tea" ,"Black tie" ,"Chai latte" ,"Red tie" ,"Yuanyang" ,"Liqueur coffee" ,"Irish coffee" ,"Rüdesheimer Kaffee"
        ,"Pharisäer" ,"Carajillo" ,"Melya" ,"Caffè Marocchino" ,"Café miel" ,"Mocha or café mocha or mochaccino" ,"Café de olla"
        ,"Greek frappé coffee" ,"Mazagran" ,"Palazzo" ,"Ice Shot" ,"Affogato" ,"Caffè Medici" ,"Café Touba"
        ,"Indian filter coffee" ,"Moka" ,"Shakerato" ,"Pocillo"]

menu1 = mapProduct ["coca cola", "placinta", "cucurucu" ]
menu2 = mapProduct ["capucino", "espresso", "placinta cu mere" ]
menu3 = mapProduct ["koktail de mure", "vafe", "apa plata" ]

-- TABLES

toTable (i,name) = Table (TableId 1) name 
tables1 = map toTable [(1,"Table 1"),(2,"Table 2")]

-- RESTAURANTS

toRest (i,str,m) = Restaurant (RestId i) str tables1 m

rest1 = (1,"Zvon Cafe",take 20 menu0)
rest2 = (2,"Colectiv",menu2)
rest3 = (3,"La mama",menu3)
rest4 = (5,"La placinte",menu1)

allRestaurants = map toRest [rest1,rest2,rest3,rest4]

-- USERS

toUser = User . UserId
allUsers = map toUser [1..4]

-- ORDERS

toOrder restList users (oid,rid,tid,uorders) =
        Order { _orderId = OrderId oid
              , _orderRest = rest
              , _orderTable = table
              , _userOrders = userOrders
              , _closed = False
              }
        where rest = fromJust $ List.find (\r -> _restId r == RestId tid) (restList::[Restaurant])
              table = fromJust $ List.find (\r -> _tableId r == TableId tid) (_restTables rest)
              menu = _restMenu rest
              userOrders = map toUserOrder uorders
              toUserOrder :: (Int,[(Int,Int)]) -> UserOrder
              toUserOrder (uid,products) = 
                UserOrder { _userOrder = findUser uid
                          , _nextOrderItemId = OrderItemId 20
                          , _userOrderProducts = orderItems products
                          }
              findUser uid = fromJust $ List.find (\x -> _userId x == UserId uid) users
              orderItems = map (\(i,j) -> OrderItem (OrderItemId i) (menu !! j))

order1 = (1, 1, 1, [(1,[(5,0),(1,1),(2,0),(3,2)])
                   ,(2,[(5,0),(1,2)])
                   ])
allOrders = map (toOrder allRestaurants allUsers) [order1]
