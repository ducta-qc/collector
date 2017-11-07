export const MAP_INTENTS_TO_TAGS = {
  accessories:{
    find:['O'],
    consultant:['O']
  },
  finance:{
    ask_price_reason:['O'],
    ask_price:['O', 'PriceType', 'CarSeries', 'Location', 'Source'],
    ask_price_decay:['O', 'CarSeries', 'CarBrand'],
    ask_modify_price:['O'],
    ask_sell_price:['O'],
    ask_insurrance:['O'],
    ask_opex:['O', 'CarSeries'],
    ask_tax_fee:['O', 'BuyMethod', 'CarAdj'],
    ask_interest_rate:['O', 'BuyMethod'],
    compare_price:['O', 'CarSeries'],
    same_price:['O'],
    consultant_finance:['O', 'Income', 'BuyMethod', 'Possesion', 'CarSeries', 'IncomeAdj'],
    consultant_price:['O', 'PriceEqual', 'PriceLower', 'PriceUpper', 'EngineTransmission', 'CarAdj', 'CarSeries'],
    consultant_insurrance:['O']
  },
  maintenance:{
    find:['O'],
    consultant:['O']
  },
  fuel:{
    saving:['O']
  },
  road:{
    find:['O'],
    consultant:['O']
  },
  safety:{
    find:['O'],
    ask_reason:['O'],
    consultant:['O']
  },
  tire:{
    find:['O'],
    consultant:['O'],
    compare:['O'],
    review:['O'],
    sentiment:['O']
  },
  engine:{
    find:['O', 'EngineAdj'],
    consultant:['O', 'EngineFuel', 'EngineType', 'EngineTransmission'],
    compare:['O', 'EngineFuel', 'EngineAdj', 'EngineProp'],
    review:['O', 'EngineFuel', 'EngineAdj'],
    sentiment:['O']
  },
  gear_box:{
    find:['O'],
    consultant:['O'],
    compare:['O'],
    review:['O']
  },
  spare_part:{
    find:['O'],
    consultant:['O']
  },
  supercar:{
    find:['O'],
    consultant:['O'],
    review:['O']
  },
  experience:{
    buy:['O'],
    driving:['O'],
    entertainment:['O'],
    fixing:['O'],
    modify:['O'],
    parking:['O'],
    fuel:['O'],
    technique:['O']
  },
  fault:{
    find:['O', 'CarSeries', 'FaultType', 'Location'],
    consultant:['O']
  },
  car_series:{
    find:['O', 'CarBody','CarSeries', 'CarProp','CarPropValue', 'CarBrand', 'CarClass',
      'PromotionTrend', 'CarBrand', 'PriceEqual', 'PriceUpper', 'PriceLower','EngineDisplacement',
      'CarElem', 'CarElemProp', 'CarElemAdj', 'EngineFuel', 'CarAdj', 'PurposeUsage', 
      'DateTime', 'CarYear', 'Location', 'Gender'],
    ask_purpose_usage:['O','CarSeries', 'PurposeUsage', 'CarAdj'],
    ask_element:['O', 'CarElem', 'CarElemProp', 'CarSeries'],
    ask_property:['O', 'CarSeries', 'PurposeUsage', 'CarProp', 'CarPropValue', 'CarBrand', 'CarElem', 'CarElemProp'],
    ask_similarity:['O', 'CarSeries'],
    ask_buy_procedure:['O', 'CarSeries'],
    compare:['O', 'CarSeries', 'CarAdj', 'PriceEqual', 'CarYear', 'PurposeUsage', 'Gender'],
    compare_same_price:['O', 'CarSeries', 'CarBody'],
    compare_element:['O', 'CarElem', 'CarSeries', 'CarYear', 'CarElemProp'],
    compare_property:['O', 'CarSeries', 'CarProp', 'CarYear'],
    consultant_buy:['O', 'CarAdj', 'Gender', 'CarSeries', 'PriceEqual','PriceUpper', 
        'PriceLower', 'EngineFuel', 'PurposeUsage', 'Source', 'CarClass', 'DateTime'],
    consultant_buy_age:['O', 'YearBorn', 'Age', 'CarProp', 'AgeType'],
    consultant_buy_five_elements:['O', 'FiveElem', 'CarProp'],
    consultant_buy_for_people:['O', 'PeopleAdj'],
    consultant_buy_income:['O', 'Income', 'PriceEqual', 'CarSeries'],
    consultant_buy_traffic:['O'],
    consultant_buy_purpose:['O', 'PurposeUsage', 'CarBrand'],
    review:['O', 'CarSeries', 'CarBrand'],
    review_element:['O', 'CarElem', 'CarElemProp', 'CarSeries'],
    review_property:['O', 'CarProp', 'CarSeries'],
    show_gallery:['O', 'CarSeries'],
    highlight_features:['O', 'CarSeries'],
    new_arrivals:['O', 'DateTime', 'CarAdj'],
    sentiment:['O', 'CarSeries'],
    sentiment_element:['O', 'CarElem', 'CarSeries'],
    sentiment_property:['O', 'CarProp', 'CarSeries']
  },
  car_brand:{
    find:['O', 'CarBrandAdj', 'Location', 'AgeType'],
    compare:['O', 'CarBrand'],
    compare_property:['O', 'CarBrandProp', 'CarBrand'],
    review:['O', 'CarBrand'],
    review_property:['O'],
    sentiment:['O'],
    sentiment_property:['O']
  },
  car_by_country:{
    ask_property:['O','CarProp', 'MadeByCountry'],
    compare:['O', 'MadeByCountry', 'CarAdj'],
    compare_property:['O', 'CarProp', 'MadeByCountry'],
    review:['O', 'MadeByCountry'],
    review_property:['O'],
    sentiment:['O'],
    sentiment_property:['O']
  },
  car_by_source:{
    ask_property:['O','CarProp'],
    compare:['O', 'CarSeries', 'CarBrand', 'Source', 'Location'],
    compare_property:['O', 'Source', 'SourceProp'],
    review:['O'],
    review_property:['O'],
    sentiment:['O'],
    sentiment_property:['O']
  },
  minor:{
    autopilot:['O'],
    career:['O'],
    club:['O'],
    duration:['O'],
    definition:['O'],
    document:['O'],
    enviroment:['O'],
    electronic:['O'],
    forum:['O'],
    healthy:['O'],
    idealistic:['O'],
    marketing:['O'],
    smart_connect:['O'],
    sos:['O'],
    traffic_culture:['O'],
    driving_mode:['O']
  },
  law:{
    modify:['O'],
    traffic:['O']
  },
  license:{
    learn_driving:['O'],
    procedure:['O'],
    test:['O']
  },
  care:{
    find:['O'],
    consultant:['O']
  },
  option:{
    find:['O'],
    consultant:['O']
  },
  modify:{
    find:['O'],
    consultant:['O']
  },
  news:{
    competition:['O'],
    market:['O'],
    racing:['O'],
    supercar:['O'],
    technology:['O'],
    traffic:['O'],
    new_car_model:['O']
  },
  paperwork:{
    import:['O'],
    procedure:['O']
  },
  promotion:{
    find:['O', 'CarBrand', 'CarSeries', 'DateTime']
  },
  my_garage:{
    show:['O'],
    put_car:['O'],
    pop_car:['O'],
    reorder:['O']
  },
  system:{
    cancel:['O'],
    greating:['O'],
    love_bot:['O'],
    thanks:['O'],
    wishes:['O'],
    help:['O'],
    my_account:['O'],
    login:['O'],
    logout:['O'],
    sitemap:['O'],
    good_bye:['O'],
    user_report:['O']
  },
  sales:{
    find:['O']
  },
  salon:{
    find:['O'],
    compare:['O'],
    review:['O']
  },
  security:{
    alarm:['O'],
    gps:['O'],
    lock:['O']
  },
  service:{
    rent:['O'],
    procedure:['O'],
    check_car:['O']
  },
  test_drive:{
    register:['O', 'CarSeries', 'Location', 'DateTime', 'Showroom'],
    my_test_drive:['O', 'CarSeries'],
    change:['O', 'DateTime'],
    cancel:['O'],
    rating:['O'],
    confirm:['O'],
    checkin:['O'],
    completed_and_i_did:['O', 'CarSeries'],
    completed_and_i_seated_in:['O'],
    completed_but_i_did_not:['O'],
    consultant:['O']
  },
  other:{
    this_is_my_car:['O'],
    use_tags:['O']
  }
}