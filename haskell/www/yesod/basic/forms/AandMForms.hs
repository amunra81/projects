import           Control.Applicative ((<$>), (<*>))
import           Data.Text           (Text)
import           Data.Time           (Day)
import           Yesod
import           Yesod.Form.Jquery

data Car = Car
    { carModel :: Text
    , carYear :: Int
    }
  deriving Show

carAForm :: AForm Synopsis Synopsis Car
carAForm = Car
    <$> areq textField "Model" Nothing
    <*> areq intField "Year" Nothing

carForm :: Html -> MForm Synopsis Synopsis (FormResult Car, Widget)
carForm = renderTable carAForm
