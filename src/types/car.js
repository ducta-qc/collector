export const MAP_INTENTS_TO_TAGS = {
  accessories:{
    find:['O'],
    consultant:['O']
  },
  finance:{
    ask_price_reason:['O'],
    ask_price:['O', 'PriceType', 'CarSeries', 'Location', 'Source', 
      'CarBrand', 'DateTime', 'PurposeUsage', 'CarYear'],
    ask_price_decay:['O', 'CarSeries', 'CarBrand'],
    ask_modify_price:['O'],
    ask_selling_price:['O', 'CarSeries', 'CarYear', 'CarAdj', 'CarBrand'],
    ask_insurrance:['O', 'DateTime'],
    ask_opex:['O', 'CarSeries', 'Location', 'Source', 'CarAdj'],
    ask_tax_fee:['O', 'BuyMethod', 'CarAdj', 'CarSeries', 'Location', 'Source'],
    ask_interest_rate:['O', 'BuyMethod'],
    compare_price:['O', 'CarSeries', 'PriceType', 'CarBrand', 'CarBrand', 
      'CarBody', 'CarAdj', 'Location', 'MadeByCountry'],
    compare_selling_price:['O', 'CarSeries', 'CarYear', 'CarAdj', 'CarBrand'],
    compare_price_decay:['O', 'CarBrand', 'CarSeries', 'CarYear'],
    consultant_finance:['O', 'Income', 'BuyMethod', 'Possesion', 'CarSeries', 'IncomeAdj', 'CarBrand', 'Location', 'DateTime'],
    consultant_price:['O', 'PriceEqual', 'PriceLower', 'PriceUpper', 'CarBrand',
      'EngineTransmission', 'CarAdj', 'CarSeries', 'CarYear', 'CarVersion'],
    consultant_insurrance:['O'],
    consultant_selling_price:['O']
  },
  maintenance:{
    find:['O'],
    consultant:['O']
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
    find:['O', 'EngineAdj', 'EngineType', 'EngineFuel'],
    consultant:['O', 'EngineFuel', 'EngineType', 'EngineTransmission'],
    compare:['O', 'EngineFuel', 'EngineAdj', 'EngineProp', 'EngineType'],
    review:['O', 'EngineFuel', 'EngineAdj','EngineType'],
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
      'PromotionTrend', 'CarBrand', 'PriceEqual', 'PriceUpper', 'PriceLower', 'PriceRange', 'EngineDisplacement',
      'CarElem', 'CarElemProp', 'CarElemAdj', 'EngineFuel', 'CarAdj', 'PurposeUsage', 
      'DateTime', 'CarYear', 'Location', 'Gender', 'Source', 'EngineType', 
      'MadeByCountry', 'TrafficType', 'EngineTransmission', 'CarVersion'],
    ask_purpose_usage:['O','CarSeries', 'PurposeUsage', 'CarAdj'],
    ask_element:['O', 'CarElem', 'CarElemProp', 'CarSeries', 'CarBody', 'CarBrand', 'EngineFuel', 'DateTime'],
    ask_property:['O', 'CarSeries', 'PurposeUsage', 'CarProp', 'CarPropValue', 'CarBrand', 
        'CarElem', 'CarElemProp', 'CarAdj', 'Source', 'MadeByCountry'],
    ask_similarity:['O', 'CarSeries'],
    ask_buy_procedure:['O', 'CarSeries', 'BuyMethod', 'Location'],
    ask_same_price:['O', 'CarSeries'],
    ask_same_class:['O', 'CarSeries'],
    ask_buy_reason:['O'],
    ask_trending:['O', 'DateTime', 'Location'],
    compare:['O', 'CarSeries', 'CarAdj', 'PriceEqual', 'CarYear', 
        'PurposeUsage', 'Gender', 'EngineFuel', 'CarBrand', 'CarVersion', 
        'EngineDisplacement', 'Source', 'EngineTransmission', 'Location'],
    compare_same_price:['O', 'CarSeries', 'CarBody', 'MadeByCountry'],
    compare_same_class:['O', 'CarSeries', 'CarBody', 'CarClass'],
    compare_element:['O', 'CarElem', 'CarSeries', 'CarYear', 'CarElemProp', 'CarBrand', 'CarAdj', 'CarVersion'],
    compare_property:['O', 'CarSeries', 'CarProp', 'CarPropValue', 'CarYear', 
      'CarBrand', 'CarBody', 'Location', 'DateTime', 'CarVersion'],
    consultant_buy:['O', 'CarAdj', 'Gender', 'CarSeries', 'PriceEqual','PriceUpper', 
        'PriceRange', 'PriceLower', 'CarElem', 'CarElemProp', 'EngineFuel', 'PurposeUsage', 
        'Source', 'CarClass', 'DateTime', 'CarBody', 'CarBrand', 'EngineType', 'BuyMethod',
        'Location', 'Possesion', 'CarYear', 'MadeByCountry', 'Age', 'EngineTransmission', 
        'CarVersion', 'CarProp', 'CarPropValue'],
    consultant_buy_age:['O', 'YearBorn', 'Age', 'CarProp', 'AgeType', 'CarSeries', 'CarBrand'],
    consultant_buy_five_elements:['O', 'FiveElem', 'CarProp', 'CarPropValue'],
    consultant_buy_for_people:['O', 'PeopleAdj'],
    consultant_buy_income:['O', 'Income', 'PriceEqual', 'CarSeries', 'CarBrand', 'BuyMethod'],
    consultant_buy_traffic:['O', 'TrafficType', 'CarAdj', 'Location', 'CarSeries'],
    consultant_buy_purpose:['O', 'PurposeUsage', 'CarBrand'],
    review:['O', 'CarSeries', 'CarBrand', 'PriceEqual', 'Location', 'Source', 
      'DateTime', 'MadeByCountry', 'Source', 'EngineFuel', 'CarYear'],
    review_element:['O', 'CarElem', 'CarElemProp', 'CarSeries', 'MadeByCountry', 'EngineFuel', 'CarBrand'],
    review_property:['O', 'CarProp', 'CarSeries', 'CarBrand', 'CarVersion', 'CarYear', 'DateTime'],
    show_gallery:['O', 'CarSeries', 'CarElem', 'CarBrand', 'CarBody'],
    highlight_features:['O', 'CarSeries'],
    new_arrivals:['O', 'DateTime', 'CarAdj'],
    sentiment:['O', 'CarSeries', 'MadeByCountry', 'Source'],
    sentiment_element:['O', 'CarElem', 'CarElemProp', 'CarSeries', 'MadeByCountry', 'CarBrand', 'EngineFuel'],
    sentiment_property:['O', 'CarProp', 'CarSeries', 'CarYear', 'CarAdj', 'CarBrand'],
  },
  car_brand:{
    find:['O', 'CarBrandAdj', 'Location', 'AgeType', 'Age', 'Gender'],
    ask_property:['O', 'CarBrand', 'CarProp', 'DateTime', 'Location'],
    compare:['O', 'CarBrand', 'Source', 'CarAdj', 'CarProp'],
    compare_property:['O', 'CarProp', 'CarBrand', 'Location'],
    review:['O', 'CarBrand'],
    review_property:['O'],
    sentiment:['O'],
    sentiment_property:['O']
  },
  car_by_country:{
    ask_property:['O','CarProp', 'MadeByCountry'],
    compare:['O', 'MadeByCountry', 'CarAdj'],
    compare_property:['O', 'CarProp', 'MadeByCountry', 'Location'],
    review:['O', 'MadeByCountry'],
    review_property:['O'],
    sentiment:['O'],
    find:['O', 'CarBrand'],
    sentiment_property:['O']
  },
  car_by_source:{
    ask_property:['O','CarProp'],
    compare:['O', 'CarSeries', 'CarBrand', 'Source', 'Location', 'CarAdj'],
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
    reorder:['O'],
    init:['O']
  },
  system:{
    cancel:['O'],
    greating:['O'],
    love_bot:['O'],
    thanks:['O'],
    wishes:['O'],
    help:['O'],
    my_account:['O'],
    my_news:['O'],
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
    register:['O', 'CarSeries', 'Location', 'DateTime', 
    'Showroom', 'Email', 'CarBrand', 'PhoneNumber', 'VerifyCode'],
    my_test_drive:['O', 'CarSeries'],
    change:['O', 'DateTime', 'CarSeries'],
    cancel:['O', 'CarSeries'],
    rating:['O', 'CarSeries'],
    confirm:['O', 'CarSeries', 'DateTime'],
    checkin:['O'],
    completed_and_i_did:['O', 'CarSeries'],
    completed_and_i_seated_in:['O'],
    completed_but_i_did_not:['O'],
    consultant:['O', 'CarSeries'],
    find:['O','CarSeries', 'DateTime', 'Showroom', 'Location']
  },
  other:{
    this_is_my_car:['O'],
    this_is_my_wish_car:['O'],
    use_tags:['O']
  }
}