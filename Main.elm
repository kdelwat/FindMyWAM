module Main exposing (..)

import String
import Html exposing (Html, button, div, text, input)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


main =
    Html.beginnerProgram { model = model, view = view, update = update }


type alias Model =
    { examWeighting : Int, examMark : Int, examHurdle : Int }


model : Model
model =
    { examWeighting = 0, examMark = 0, examHurdle = 0 }


type Msg
    = UpdateExamWeighting String
    | UpdateExamMark String
    | UpdateExamHurdle String


convertStringToPercentage : String -> Int
convertStringToPercentage s =
    String.toInt s |> Result.toMaybe |> Maybe.withDefault 0


convertPercentageToString : Int -> String
convertPercentageToString p =
    toString p


update : Msg -> Model -> Model
update msg model =
    case msg of
        UpdateExamWeighting weighting ->
            { model | examWeighting = convertStringToPercentage weighting }

        UpdateExamMark mark ->
            { model | examWeighting = convertStringToPercentage mark }

        UpdateExamHurdle hurdle ->
            { model | examHurdle = convertStringToPercentage hurdle }


view : Model -> Html Msg
view model =
    div []
        [ input [ placeholder "Exam weighting", onInput UpdateExamWeighting ] []
        , input [ placeholder "Exam mark", onInput UpdateExamMark ] []
        , input [ placeholder "Exam hurdle", onInput UpdateExamHurdle ] []
        , div [] [ text (convertPercentageToString model.examWeighting) ]
        ]
