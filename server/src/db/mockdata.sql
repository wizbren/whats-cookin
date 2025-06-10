

INSERT INTO Users (id, name, email, password)
VALUES
  (1, 'Berti Josiah', 'bjosiah0@yahoo.co.jp', 'gA1\f0/n|!Q'),
  (2, 'Colly Westcott',	'cwestcott1@umn.edu', 'hT4=nfWM'),
  (3, 'Zolly Hinks', 'zhinks2@domainmarket.com', 'lG3_y0'),
  (4, 'Heidi Gland', 'hgland3@moonfruit.com', 'vW4%s$?~5h6K'),
  (5, 'Corinne Luna', 'cluna4@prlog.org', 'gI2#4~ewV`7'),
  (6, 'Renado Ellyatt', 'rellyatt5@earthlink.net', 'dK7$8E!'),
  (7, 'Rodi Mackerel', 'rmackerel6@pbs.org', 'sP4`teF'),
  (8, 'Joy Dober', 'jdober7@stumbleupon.com', 'jV7~fdd9'),
  (9, 'Culver Gillean', 'cgillean8@msu.edu', 'zA2(Y".+1{.'),
  (10, 'Julie Ladds',	'jladds9@deliciousdays.com', 'pQ9~EF');


INSERT INTO Recipes (id, user_id, url, liked, image)
VALUES
  (1, 7, 'https://www.edamam.com/results/recipe/?recipe=green-salad-with-avocado-2dbeaf3e96adcdcbcb3a4445ec9729d9/search=salad', true, 'https://shorturl.at/r3d3r'),
  (2,	5, 'https://www.edamam.com/results/recipe/?recipe=israeli-salad-recipe-8727c90d6f0b4d295c54f566805d2385/search=salad', false, 'https://shorturl.at/QrIlT'),
  (3, 2, 'https://www.edamam.com/results/recipe/?recipe=hot-mustard-recipe-dfcafdc018404541a005c346df3d101b/search=', true, 'https://shorturl.at/rtngE'),
  (4, 3, 'https://www.edamam.com/results/recipe/?recipe=buttermilk-barley-biscuits-aa4ae98379cc2117db4ad7d5576a2931/search=',	false, 'https://shorturl.at/2jzSO'),
  (5, 9, 'https://www.edamam.com/results/recipe/?recipe=pasta-alla-gricia-recipe-20022d91be0968092a8eab1aceee81be/search=', false, 'https://tinyurl.com/mwuy3y6p');