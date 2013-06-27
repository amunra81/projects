{-# LANGUAGE TupleSections, OverloadedStrings #-}
module Handler.Home where

import Import

-- This is a handler function for the GET request method on the HomeR
-- resource pattern. All of your resource patterns are defined in
-- config/routes
--
-- The majority of the code you will write in Yesod lives in these handler
-- functions. You can spread them across multiple files if you are so
-- inclined, or create a single monolithic file.
-- -i../ -cpp -optP-DDEVELOPMENT -fno-warn-warnings-deprecations -XTemplateHaskell -XQuasiQuotes -XOverloadedStrings -XNoImplicitPrelude -XCPP -XMultiParamTypeClasses -XTypeFamilies -XGADTs -XGeneralizedNewtypeDeriving -XFlexibleContexts -XEmptyDataDecls -XNoMonomorphismRestriction -XDeriveDataTypeable 

getHomeR :: Handler RepHtml
getHomeR = do
    (formWidget, formEnctype) <- generateFormPost sampleForm
    let submission = Nothing :: Maybe (FileInfo, Text , Text)
        handlerName = "getHomeR" :: Text
    defaultLayout $ do
        aDomId <- newIdent
        setTitle "Welcome To Yesod!"
        $(widgetFile "homepage")

postHomeR :: Handler RepHtml
postHomeR = do
    ((result, formWidget), formEnctype) <- runFormPost sampleForm
    let handlerName = "postHomeR" :: Text
        submission = case result of
            FormSuccess res -> Just res
            _ -> Nothing

    defaultLayout $ do
        aDomId <- newIdent
        setTitle "Welcome To Yesod!"
        $(widgetFile "homepage")

sampleForm :: Form (FileInfo, Text , Text)
sampleForm = renderDivs $ (,,)
    <$> fileAFormReq "Choose a file"
    <*> areq textField "What's on the file?" Nothing
    <*> areq textField "Sa imi bag putzica mea" (Just "Pula")
