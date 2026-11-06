export type LangPack = { prompt: string; options: string[]; explain?: string }
export type QI18n = Record<string, { en: LangPack; ja: LangPack }>

export const Q_I18N: QI18n = {
  e01: {
    en: { prompt: 'In Unbeatable, what job does Cheng Fai take after prison?', options: ['Minibus driver', 'Taxi driver', 'Delivery', 'Security'], explain: 'Taxi driver.' },
    ja: { prompt: '『激戦』で出獄後の程輝の仕事は？', options: ['ミニバス', 'タクシー', '配達', '警備'], explain: 'タクシー。' },
  },
  e02: {
    en: { prompt: 'In Unbeatable, which city does Cheng Fai flee to from Hong Kong?', options: ['Shenzhen', 'Taipei', 'Guangzhou', 'Macau'], explain: 'Macau.' },
    ja: { prompt: '『激戦』で借金逃れに向かった都市は？', options: ['深圳', '台北', '広州', 'マカオ'], explain: 'マカオ。' },
  },
  e03: {
    en: { prompt: 'In Unbeatable, what is student Si-kei’s background?', options: ['Mainland rich kid, family ruined', 'Retired boxer in debt', 'HK cop reassigned', 'Triad newbie just out'], explain: 'Mainland rich kid, family ruined.' },
    ja: { prompt: '『激戦』で弟子・思斉の経歴は？', options: ['没落した大陸の御曹司', '借金のある元ボクサー', '異動した香港警官', '出所したばかりのチンピラ'], explain: '没落した大陸の御曹司。' },
  },
  e04: {
    en: { prompt: 'In Beast Stalker, why does Hung Jing take the kidnapping job?', options: ['Pay gambling debts', 'Buy a flat', 'Earn money to care for his paralyzed wife', 'Revenge'], explain: 'Earn money to care for his paralyzed wife.' },
    ja: { prompt: '『証人』で洪荊が誘拐を引き受ける理由は？', options: ['ギャンブルの借金', '住宅購入', '麻痺した妻の介護費', '復讐'], explain: '麻痺した妻の介護費のため。' },
  },
  e05: {
    en: { prompt: 'In Beast Stalker, the kidnap target is prosecutor Gao Min’s…?', options: ['Husband', 'Mother', 'Younger daughter', 'Younger sister'], explain: 'Younger daughter.' },
    ja: { prompt: '『証人』で誘拐対象は検事・高敏の何？', options: ['夫', '母', '末娘', '妹'], explain: '末娘。' },
  },
  e06: {
    en: { prompt: 'In The Conmen in Vegas (1999), who plays Hua Gu Long’s sister Ching Ching?', options: ['Anita Yuen', 'Monica Chan', 'Amy Kwok', 'Mei Ting'], explain: 'Anita Yuen.' },
    ja: { prompt: '『賭俠1999』で化骨龍の妹・晴晴役は？', options: ['朱茵', '張慧儀', '関詠荷', '梅婷'], explain: '朱茵。' },
  },
  e07: {
    en: { prompt: 'In The Legendary Four Aces, who plays Zhu Zhishan?', options: ['Gordon Lam', 'Wayne Lai', 'Nick Cheung', 'Bobby Au-yeung'], explain: 'Bobby Au-yeung.' },
    ja: { prompt: '『金装四大才子』で祝枝山役は？', options: ['林家棟', '魏駿傑', '張家輝', '欧陽震華'], explain: '欧陽震華。' },
  },
  e08: {
    en: { prompt: 'In Secret of the Heart, whom does Kam Leung-wang befriend?', options: ['Cheuk Sheung-man', 'Ching Ka-hung', 'Tung Sai-fung', 'Kam Shu-sang'], explain: 'Ching Ka-hung.' },
    ja: { prompt: '『天地豪情』で甘量宏の親友は？', options: ['卓尚文', '程家雄', '董世鋒', '甘樹生'], explain: '程家雄。' },
  },
  e09: {
    en: { prompt: 'In Election, Fei Gei later becomes godson of which boss?', options: ['Big D', 'Uncle Deng', 'Chicken', 'Lok (Lam Wai-lok)'], explain: 'Lok (Lam Wai-lok).' },
    ja: { prompt: '『黒社会』で飛行機が乾息子になった親分は？', options: ['大D', '鄧伯', '吹雞', '楽少（林懐楽）'], explain: '楽少（林懐楽）。' },
  },
  e10: {
    en: { prompt: 'In The Conman, how do Yu Chung-ching and Gu Jing make a living?', options: ['Qinggong', 'Card cheating', 'Medicine', 'Magic'], explain: 'Card cheating.' },
    ja: { prompt: '『騙中伝説』で余忠正と顧井の稼ぎは？', options: ['軽功', 'イカサマ', '医術', 'マジック'], explain: 'イカサマ。' },
  },
  m11: {
    en: { prompt: 'In Nightfall, how many years was Wang jailed for murder?', options: ['20 years', '10 years', '5 years', '30 years'], explain: '20 years.' },
    ja: { prompt: '『大追捕』で王遠陽の服役年数は？', options: ['20年', '10年', '5年', '30年'], explain: '20年。' },
  },
  m12: {
    en: { prompt: 'In Nightfall, the girl Wang meets after prison is…?', options: ['Lam Ching-chung', 'Ah Dai', 'Tsui Suet', 'Gao Min'], explain: 'Tsui Suet.' },
    ja: { prompt: '『大追捕』で出獄後に会う少女は？', options: ['林正忠', '阿弟', '徐雪', '高敏'], explain: '徐雪。' },
  },
  m13: {
    en: { prompt: 'In Nightfall, who is the fiery detective on the burnt-body case?', options: ['Tong Fei', 'Lam Ching-chung', 'Lee Chong-tung', 'Inspector Chan'], explain: 'Lam Ching-chung.' },
    ja: { prompt: '『大追捕』で焼死体事件を追う刑事は？', options: ['唐飛', '林正忠', '李滄東', '陳督察'], explain: '林正忠。' },
  },
  m14: {
    en: { prompt: 'In The Stool Pigeon, who plays informant “Ghost”?', options: ['Louis Koo', 'Eddie Peng', 'Lu Yi', 'Nicholas Tse'], explain: 'Nicholas Tse.' },
    ja: { prompt: '『線人』で「細鬼」役は？', options: ['古天楽', '彭于晏', '陸毅', '謝霆鋒'], explain: '謝霆鋒。' },
  },
  m15: {
    en: { prompt: 'In The Stool Pigeon, what does Ghost do?', options: ['Doctor', 'Bank manager', 'Underground racer', 'Chef'], explain: 'Underground racer.' },
    ja: { prompt: '『線人』で細鬼の仕事は？', options: ['医者', '銀行支店長', '地下レーサー', '料理人'], explain: '地下レーサー。' },
  },
  m16: {
    en: { prompt: 'In Beast Stalker, which sergeant accidentally kills Gao Min’s elder daughter?', options: ['Tong Fei', 'Cheung Yat-tung', 'Sun Ye', 'Dai Mi'], explain: 'Tong Fei.' },
    ja: { prompt: '『証人』で長女を誤殺した巡査は？', options: ['唐飛', '張日東', '新爺', '大咪'], explain: '唐飛。' },
  },
  m17: {
    en: { prompt: 'In Exiled, where do Wo and family want to settle?', options: ['Taiwan', 'Thailand', 'Singapore', 'Macau'], explain: 'Macau.' },
    ja: { prompt: '『放・逐』で阿和一家が住みたい場所は？', options: ['台湾', 'タイ', 'シンガポール', 'マカオ'], explain: 'マカオ。' },
  },
  m18: {
    en: { prompt: 'In Exiled, who plays Tai Fei?', options: ['Simon Yam', 'Anthony Wong', 'Francis Ng', 'Gordon Lam'], explain: 'Simon Yam.' },
    ja: { prompt: '『放・逐』で大飛役は？', options: ['任達華', '黄秋生', '呉鎮宇', '林家棟'], explain: '任達華。' },
  },
  m19: {
    en: { prompt: 'In Exiled, why does Tai Fei hunt Wo?', options: ['Wo stole his money', 'Wo once shot him', 'They fought over a woman', 'Wo betrayed him'], explain: 'Wo once shot him.' },
    ja: { prompt: '『放・逐』で大飛が阿和を追う理由は？', options: ['金を盗んだ', 'かつて撃たれた', '女を争った', '裏切られた'], explain: 'かつて撃たれたから。' },
  },
  m20: {
    en: { prompt: 'In The Conmen in Vegas (1999), how many years was Ah King in prison?', options: ['1 year', '3 years', '5 years', '10 years'], explain: '5 years.' },
    ja: { prompt: '『賭俠1999』で阿Kingの服役年数は？', options: ['1年', '3年', '5年', '10年'], explain: '5年。' },
  },
  h21: {
    en: { prompt: 'In The Conmen in Vegas (1999), villain Sing Geng is whose younger brother?', options: ['Ma Kau Man', 'Ah Chung', 'Chimney', 'Uncle Leng'], explain: 'Chimney.' },
    ja: { prompt: '『賭俠1999』で省鏡は誰の弟？', options: ['馬交文', '阿松', '煙囪', '靚叔'], explain: '煙囪。' },
  },
  h22: {
    en: { prompt: 'In The Conmen in Vegas (1999), Ah King and Hua Gu Long hire adult-film director Leung Jing to fake what footage?', options: ['Horse racing', 'World Cup final', 'Boxing match', 'Olympics'], explain: 'World Cup final.' },
    ja: { prompt: '『賭俠1999』で偽映像として撮ったのは？', options: ['競馬', 'W杯決勝', 'ボクシング', '五輪'], explain: 'W杯決勝。' },
  },
  h23: {
    en: { prompt: 'In Election, Fei Gei is the right-hand man of…?', options: ['Big D', 'Chicken', 'Uncle Deng', 'Fish Head Biu'], explain: 'Fish Head Biu.' },
    ja: { prompt: '『黒社会』で飛行機の上司は？', options: ['大D', '吹雞', '鄧伯', '魚頭標'], explain: '魚頭標。' },
  },
  h24: {
    en: { prompt: 'In Election, Big D (Tony Leung Ka-fai) is really named…?', options: ['Lui Chiu', 'Lam Wai-lok', 'Deng Wai', 'So Wo'], explain: 'Lui Chiu.' },
    ja: { prompt: '『黒社会』で大Dの本名は？', options: ['雷超', '林懐楽', '鄧威', '蘇和'], explain: '雷超。' },
  },
  h25: {
    en: { prompt: 'In The Legendary Four Aces, Tang Bohu is nicknamed…?', options: ['One Stick Divine Brush', 'Red Snake in the Cave', 'Iron Stroke Silver Hook', 'Flying Immortal'], explain: 'One Stick Divine Brush.' },
    ja: { prompt: '『金装四大才子』で唐伯虎の異名は？', options: ['一炷神筆', '洞裏赤練蛇', '鉄劃銀勾', '天外飛仙'], explain: '一炷神筆。' },
  },
  h26: {
    en: { prompt: 'In Secret of the Heart, what is Kam Shu-pui’s identity?', options: ['Hotel tycoon', 'Jeweler', 'Shipping king', 'Aviation mogul'], explain: 'Aviation mogul.' },
    ja: { prompt: '『天地豪情』で甘樹培の身分は？', options: ['ホテル王', '宝石商', '船王', '航空業の大物'], explain: '航空業の大物。' },
  },
  h27: {
    en: { prompt: 'In At the Threshold of an Era… (十萬噸情緣), what is Tin Wai-chan’s father’s name?', options: ['Tin Lap-yin', 'Tin Lap-kwong', 'Tin Wai-kwong', 'Tin Shu-pui'], explain: 'Tin Lap-kwong.' },
    ja: { prompt: '『十万噸情縁』で田偉晨の父の名は？', options: ['田立言', '田立光', '田偉光', '田樹培'], explain: '田立光。' },
  },
  h28: {
    en: { prompt: 'In Detective Investigation Files… (勇探實錄), what is Chow Ka-wing’s ex-girlfriend’s name?', options: ['Chin Bo-yee', 'Ling Siu-ha', 'Chin Nga-lai', 'Kong Yuk-lun'], explain: 'Chin Nga-lai.' },
    ja: { prompt: '『勇探実録』で周家栄の元カノは？', options: ['銭宝児', '凌少霞', '銭雅麗', '江玉麟'], explain: '銭雅麗。' },
  },
  h29: {
    en: { prompt: 'In Breaking News (2004), Richie Jen’s “Yuen” is…?', options: ['A superintendent', 'A gang boss', 'A reporter', 'A stowaway'], explain: 'A gang boss.' },
    ja: { prompt: '『大事件』(2004)で任賢斉の「元」は？', options: ['警視', '悍匪の首領', '記者', '密航者'], explain: '悍匪の首領。' },
  },
  h30: {
    en: { prompt: 'In Exiled, the five take which job to leave money for Wo’s family?', options: ['Rob a gold shop', 'Escort a witness', 'Steal diamonds', 'Assassinate Macau boss Egg Roll Keung'], explain: 'Assassinate Macau boss Egg Roll Keung.' },
    ja: { prompt: '『放・逐』で残す金のための仕事は？', options: ['金店強盗', '証人護送', 'ダイヤ盗難', 'マカオの大物・蛋捲強の暗殺'], explain: '蛋捲強の暗殺。' },
  },
  m31: {
    en: { prompt: 'In The White Storm, Nick Cheung plays…?', options: ['Cheung Tsz-wai (Ah Wai)', 'Ma Ho-tin', 'So Kin-chau', 'Duen Kwan'], explain: 'Cheung Tsz-wai (Ah Wai).' },
    ja: { prompt: '『掃毒』で張家輝の役名は？', options: ['張子偉（阿偉）', '馬昊天', '蘇建秋', '段坤'], explain: '張子偉（阿偉）。' },
  },
  m32: {
    en: { prompt: 'In The White Storm, whose life does Ah Wai say even Jesus can’t save?', options: ['Eight-Face Buddha', 'Ma Ho-tin', 'Duen Kwan', 'So Kin-chau'], explain: 'Duen Kwan.' },
    ja: { prompt: '『掃毒』で「イエスでも助けられない」命は誰？', options: ['八面仏', '馬昊天', '段坤', '蘇建秋'], explain: '段坤。' },
  },
  m33: {
    en: { prompt: 'In The White Storm, which two actors play Ah Wai’s sworn brothers?', options: ['Tony Leung & Andy Lau', 'Sean Lau & Louis Koo', 'Nicholas Tse & Shawn Yue', 'Francis Ng & Simon Yam'], explain: 'Sean Lau & Louis Koo.' },
    ja: { prompt: '『掃毒』で三兄弟の他の二人は？', options: ['梁朝偉・劉徳華', '劉青雲・古天楽', '謝霆鋒・余文楽', '呉鎮宇・任達華'], explain: '劉青雲・古天楽。' },
  },
  m34: {
    en: { prompt: 'In Line Walker (film), “Ah Lam”’s full name is…?', options: ['Lam Pak-man', 'Ching To', 'Siu Chi-long', 'Hong Wing-hon'], explain: 'Lam Pak-man.' },
    ja: { prompt: '『使徒行者』映画で阿藍のフルネームは？', options: ['藍博文', '程滔', '邵志朗', '康永翰'], explain: '藍博文。' },
  },
  m35: {
    en: { prompt: 'In Line Walker (film), who plays “Sister Ding” Ding Siu-ka?', options: ['Yang Zi', 'Mandy Mong', 'Charmaine Sheh', 'Jennifer Yu'], explain: 'Charmaine Sheh.' },
    ja: { prompt: '『使徒行者』で釘姐役は？', options: ['楊紫', '蒙嘉慧', '佘詩曼', '鍾雪瑩'], explain: '佘詩曼。' },
  },
  m36: {
    en: { prompt: 'In The Duel, Lung Lung-gau’s prototype is which Gu Long character?', options: ['Chu Liuxiang', 'Li Xunhuan', 'Lu Xiaofeng', 'Ye Kai'], explain: 'Lu Xiaofeng.' },
    ja: { prompt: '『決戦紫禁之巔』で龍龍九の原型は？', options: ['楚留香', '李尋歓', '陸小鳳', '葉開'], explain: '陸小鳳。' },
  },
  m37: {
    en: { prompt: 'In The King of Comedy 2000, what is Nick’s undercover agent called?', options: ['Wong Si-fu', 'Leung Foon (Ah Foon)', 'Jersey', 'Chow Je-lun'], explain: 'Leung Foon (Ah Foon).' },
    ja: { prompt: '『千王之王2000』で卧底の名は？', options: ['黄師虎', '梁寛（阿寛）', '沢西', '周姐輪'], explain: '梁寛（阿寛）。' },
  },
  m38: {
    en: { prompt: 'In The King of Comedy 2000, Stephen Chow’s Macau conman is…?', options: ['Wong Si-fu', 'Chan Sap-sei', 'Ah Cool', 'Chimney'], explain: 'Wong Si-fu.' },
    ja: { prompt: '『千王之王2000』で星爺の役名は？', options: ['黄師虎', '陳十四', '阿酷', '煙囪'], explain: '黄師虎。' },
  },
  m39: {
    en: { prompt: 'In Silent Witness, what is Chan Ka-ho’s job?', options: ['Cop', 'Lawyer', 'Forensic pathologist', 'Reporter'], explain: 'Forensic pathologist.' },
    ja: { prompt: '『沈黙の証人』で陳嘉豪の職業は？', options: ['警察', '弁護士', '法医', '記者'], explain: '法医。' },
  },
  m40: {
    en: { prompt: 'In Silent Witness, who plays intern forensic doctor Qiao Lin?', options: ['Yang Zi', 'Charmaine Sheh', 'Meng Yao', 'Paw Hee-ching'], explain: 'Yang Zi.' },
    ja: { prompt: '『沈黙の証人』で喬琳役は？', options: ['楊紫', '佘詩曼', '孟瑤', '鮑起静'], explain: '楊紫。' },
  },
  m41: {
    en: { prompt: 'In The Vampire Cleanup Department, Nick’s exorcist is named…?', options: ['Hon Kong', 'Wong Wing-fat', 'Yu Chau', 'Choi San-keung'], explain: 'Wong Wing-fat.' },
    ja: { prompt: '『陀地駆魔人』で駆魔人の名は？', options: ['韓江', '黄永発', '于秋', '蔡辛強'], explain: '黄永発。' },
  },
  m42: {
    en: { prompt: 'In The New Royal Tramp? (新醉打金枝), the prince consort Nick plays is…?', options: ['Kwok Oi', 'Wong Fu-fan', 'Mok Chun-keung', 'Hui Lap-sang'], explain: 'Kwok Oi.' },
    ja: { prompt: '『新酔打金枝』で駙馬の名は？', options: ['郭曖', '王甫芬', '莫鎮強', '許立生'], explain: '郭曖。' },
  },
  m43: {
    en: { prompt: 'In Equator, Nick’s anti-terror superintendent is…?', options: ['Lee Chun-bong', 'Lee Yin-ming', 'Ching To', 'Lam Pak-man'], explain: 'Lee Yin-ming.' },
    ja: { prompt: '『赤道』で反恐総督察の名は？', options: ['李振邦', '李彦明', '程滔', '藍博文'], explain: '李彦明。' },
  },
  m44: {
    en: { prompt: 'In That Demon Within, Nick’s fierce criminal is…?', options: ['Hon Kong', 'Wong Wai-yip', 'Duen Kwan', 'Big D'], explain: 'Hon Kong.' },
    ja: { prompt: '『魔警』で悍匪の名は？', options: ['韓江', '王偉業', '段坤', '大D'], explain: '韓江。' },
  },
  m45: {
    en: { prompt: 'In Integrity, witness Hui Chik-yiu’s job is…?', options: ['Lawyer', 'Doctor', 'Accountant', 'Reporter'], explain: 'Accountant.' },
    ja: { prompt: '『廉政風雲』で許植堯の職業は？', options: ['弁護士', '医者', '会計士', '記者'], explain: '会計士。' },
  },
  m46: {
    en: { prompt: 'In Bursting Point, Nick’s ND superintendent is…?', options: ['Lee Yin-ming', 'Lee Chun-bong', 'Kong Ming', 'Cheung Tsz-wai'], explain: 'Lee Chun-bong.' },
    ja: { prompt: '『爆裂点』で毒品総督察の名は？', options: ['李彦明', '李振邦', '江銘', '張子偉'], explain: '李振邦。' },
  },
  m47: {
    en: { prompt: 'In The White Storm, which two brothers thought Ah Wai was dead?', options: ['Duen Kwan & Eight-Face Buddha', 'Ma Ho-tin & So Kin-chau', 'Tong Fei & Lam Ching-chung', 'Ching To & Ching Chun-yin'], explain: 'Ma Ho-tin & So Kin-chau.' },
    ja: { prompt: '『掃毒』で死んだと思っていた兄弟は？', options: ['段坤と八面仏', '馬昊天と蘇建秋', '唐飛と林正忠', '程滔と井進賢'], explain: '馬昊天と蘇建秋。' },
  },
  m48: {
    en: { prompt: 'In The White Storm, after five years missing, Ah Wai works for which drug lord?', options: ['Duen Kwan', 'Chicken', 'Eight-Face Buddha', 'Fish Head Biu'], explain: 'Eight-Face Buddha.' },
    ja: { prompt: '『掃毒』で五年後に仕える毒梟は？', options: ['段坤', '吹雞', '八面仏', '魚頭標'], explain: '八面仏。' },
  },
  m49: {
    en: { prompt: 'In Line Walker (film), Siu Chi-long pretends to be which undercover code?', options: ['King', 'Ace', 'Joker', 'Blackjack'], explain: 'Blackjack.' },
    ja: { prompt: '『使徒行者』で少爺が名乗った代号は？', options: ['King', 'Ace', 'Joker', 'Blackjack'], explain: 'Blackjack。' },
  },
  m50: {
    en: { prompt: 'In Line Walker (film), the real Blackjack is…?', options: ['Siu Chi-long', 'Lam Pak-man', 'Ching To', 'Ching Chun-yin'], explain: 'Lam Pak-man.' },
    ja: { prompt: '『使徒行者』で真のBlackjackは？', options: ['邵志朗', '藍博文', '程滔', '井進賢'], explain: '藍博文。' },
  },
  m51: {
    en: { prompt: 'In Line Walker 2, Nick’s superintendent is named…?', options: ['Lam Pak-man', 'Ching To', 'Hong Wing-hon', 'Ching Chun-yin'], explain: 'Ching To.' },
    ja: { prompt: '『使徒行者2』で総督察の名は？', options: ['藍博文', '程滔', '康永翰', '井進賢'], explain: '程滔。' },
  },
  m52: {
    en: { prompt: 'In Line Walker 2, Ching To and Ching Chun-yin were originally…?', options: ['Father and son', 'Enemies', 'Childhood friends', 'Superior and subordinate'], explain: 'Childhood friends.' },
    ja: { prompt: '『使徒行者2』で程滔と井進賢の関係は？', options: ['父子', '仇敵', '幼なじみ', '上下関係'], explain: '幼なじみ。' },
  },
  m53: {
    en: { prompt: 'In Line Walker 2’s ending, in which country do they perish with Demon?', options: ['Japan', 'Thailand', 'Spain', 'Australia'], explain: 'Spain.' },
    ja: { prompt: '『使徒行者2』終盤、Demonと共に果てた国は？', options: ['日本', 'タイ', 'スペイン', 'オーストラリア'], explain: 'スペイン。' },
  },
  m54: {
    en: { prompt: 'In Hypnotic / Judgment, Hui Lap-sang is an expert in…?', options: ['Forensics', 'Psychology and hypnosis', 'Accounting', 'Martial arts'], explain: 'Psychology and hypnosis.' },
    ja: { prompt: '『催眠・裁決』で許立生の専門は？', options: ['法医', '心理学と催眠', '会計', '武術'], explain: '心理学と催眠。' },
  },
  m55: {
    en: { prompt: 'In Hypnotic / Judgment, why is Hui forced to sway the jury?', options: ['For money', 'For promotion', 'His daughter is kidnapped', 'Revenge'], explain: 'His daughter is kidnapped.' },
    ja: { prompt: '『催眠・裁決』で陪審を操らされた理由は？', options: ['金のため', '出世のため', '娘が誘拐された', '復讐'], explain: '娘が誘拐されたから。' },
  },
  m56: {
    en: { prompt: 'In Equator, Jacky Cheung’s professor is really…?', options: ['An undercover cop', 'Arms smuggler “Red Bandit”', 'A lawyer', 'A reporter'], explain: 'Arms smuggler “Red Bandit”.' },
    ja: { prompt: '『赤道』で学友の教授の正体は？', options: ['卧底', '武器密輸の「赤盗」', '弁護士', '記者'], explain: '武器密輸の「赤盗」。' },
  },
  m57: {
    en: { prompt: 'In That Demon Within, how did Wong Wai-yip once save Hon Kong?', options: ['Bail him out', 'Gave him a blood transfusion', 'Helped him escape', 'Testified for him'], explain: 'Gave him a blood transfusion.' },
    ja: { prompt: '『魔警』で王偉業が韓江を救った方法は？', options: ['保釈', '輸血', '脱獄手伝い', '証言'], explain: '輸血。' },
  },
  m58: {
    en: { prompt: 'In The Last Breakthrough, Nick’s cardiologist is…?', options: ['Chai Pak-hang', 'Wong Fu-fan', 'Chan Ka-ho', 'Hui Lap-sang'], explain: 'Wong Fu-fan.' },
    ja: { prompt: '『天涯俠医』で心臓外科医の名は？', options: ['斉百恆', '王甫芬', '陳嘉豪', '許立生'], explain: '王甫芬。' },
  },
  m59: {
    en: { prompt: 'In The Last Breakthrough, Wong joins which rescue group?', options: ['Red Cross', 'MSF', 'Life Force', 'WHO'], explain: 'Life Force.' },
    ja: { prompt: '『天涯俠医』で加入する救援組織は？', options: ['赤十字', '国境なき医師団', '生命動力（Life Force）', 'WHO'], explain: '生命動力（Life Force）。' },
  },
  m60: {
    en: { prompt: 'In The Last Breakthrough, who plays doctor Chai Pak-hang?', options: ['William Chan', 'Raymond Lam', 'Louis Koo', 'Aaron Kwok'], explain: 'Raymond Lam.' },
    ja: { prompt: '『天涯俠医』で斉百恆役は？', options: ['陳偉霆', '林峯', '古天楽', '郭富城'], explain: '林峯。' },
  },
  m61: {
    en: { prompt: 'In Red River, Ah Ha makes a living with…?', options: ['Fruit stall', 'Street karaoke stall', 'Fishball stall', 'Newspaper stall'], explain: 'Street karaoke stall.' },
    ja: { prompt: '『紅河』で阿夏の商売は？', options: ['果物屋', '路上カラオケ', '魚団子', '新聞売り'], explain: '路上カラオケ。' },
  },
  m62: {
    en: { prompt: 'In Red River, Zhang Jingchu’s Ah Tao is from…?', options: ['Thailand', 'Vietnam', 'Malaysia', 'Philippines'], explain: 'Vietnam.' },
    ja: { prompt: '『紅河』で阿桃の国籍は？', options: ['タイ', 'ベトナム', 'マレーシア', 'フィリピン'], explain: 'ベトナム。' },
  },
  m63: {
    en: { prompt: 'In Bursting Point, who plays undercover subordinate Kong Ming?', options: ['Nicholas Tse', 'William Chan', 'Raymond Lam', 'Philip Keung'], explain: 'William Chan.' },
    ja: { prompt: '『爆裂点』で江銘役は？', options: ['謝霆鋒', '陳偉霆', '林峯', '姜皓文'], explain: '陳偉霆。' },
  },
  m64: {
    en: { prompt: 'In One Night in Mongkok Prison, Nick’s character’s nickname is…?', options: ['Tai Fei', 'Crazy Fai', 'Sai Fai', 'Fei Gei'], explain: 'Crazy Fai.' },
    ja: { prompt: '『旺角監獄』のあだ名は？', options: ['大飛', '癡線輝', '細輝', '飛行機'], explain: '癡線輝。' },
  },
  m65: {
    en: { prompt: 'In One Night in Mongkok Prison, the fierce alter ego is…?', options: ['Dai Fai', 'Sai Fai', 'Ah Dee', 'Ah Wai'], explain: 'Sai Fai.' },
    ja: { prompt: '『旺角監獄』のもう一つの人格は？', options: ['大輝', '細輝', '阿Dee', '阿偉'], explain: '細輝。' },
  },
  m66: {
    en: { prompt: 'In One Night in Mongkok Prison, why 30 years in jail?', options: ['Robbed a gold shop', 'Drug trafficking', 'Killed 20+ while wiping out traitors', 'Kidnapping'], explain: 'Killed 20+ while wiping out traitors.' },
    ja: { prompt: '『旺角監獄』で30年服役の理由は？', options: ['金店強盗', '麻薬', '裏切り者粛清で二十数人を斬った', '誘拐'], explain: '二十数人を斬ったから。' },
  },
  m67: {
    en: { prompt: 'In One Night in Mongkok Prison, who plays Fai’s mother?', options: ['Mandy Mong', 'Paw Hee-ching', 'Meng Yao', 'Charmaine Sheh'], explain: 'Paw Hee-ching.' },
    ja: { prompt: '『旺角監獄』で母役は？', options: ['蒙嘉慧', '鮑起静', '孟瑤', '佘詩曼'], explain: '鮑起静。' },
  },
  m68: {
    en: { prompt: 'In Beware of Conmen, Wang Chi-hang’s original job was…?', options: ['Cop', 'Accountant', 'Doctor', 'Lawyer'], explain: 'Accountant.' },
    ja: { prompt: '『提防老千』で王志恆の元職業は？', options: ['警察', '会計士', '医者', '弁護士'], explain: '会計士。' },
  },
  m69: {
    en: { prompt: 'In Beware of Conmen, who plays mentor Chan Sap-sei?', options: ['Stephen Chow', 'Wong Jing', 'Louis Koo', 'Philip Keung'], explain: 'Wong Jing.' },
    ja: { prompt: '『提防老千』で陳十四役は？', options: ['周星馳', '王晶', '古天楽', '姜皓文'], explain: '王晶。' },
  },
  m70: {
    en: { prompt: 'In My Wife Is a Gambling Maestro, Nick’s hero is named…?', options: ['Leung Foon', 'Chow Je-lun', 'Jersey', 'Ah King'], explain: 'Chow Je-lun.' },
    ja: { prompt: '『我老婆は賭聖』の主人公名は？', options: ['梁寛', '周姐輪', '沢西', '阿King'], explain: '周姐輪。' },
  },
  m71: {
    en: { prompt: 'In My Wife Is a Gambling Maestro, who plays Lung Ying-ying / Dina?', options: ['Anita Yuen', 'Meng Yao', 'Yang Zi', 'Jennifer Yu'], explain: 'Meng Yao.' },
    ja: { prompt: '『我老婆は賭聖』で狄娜役は？', options: ['朱茵', '孟瑤', '楊紫', '鍾雪瑩'], explain: '孟瑤。' },
  },
  m72: {
    en: { prompt: 'In Integrity, Hui flees to which country before testifying?', options: ['Canada', 'UK', 'Australia', 'USA'], explain: 'Australia.' },
    ja: { prompt: '『廉政風雲』で証言前に逃れた国は？', options: ['カナダ', '英国', 'オーストラリア', '米国'], explain: 'オーストラリア。' },
  },
  m73: {
    en: { prompt: 'In Hungry Ghost Ritual, Chung Wah and Siu Tin are…? After father falls ill, Chung becomes…?', options: ['Master–pupil; martial lead', 'Father–son; acting troupe head', 'Brothers; drummer', 'Uncle–nephew; secretary'], explain: 'Father–son; acting troupe head.' },
    ja: { prompt: '『盂蘭神功』で宗華と嘯天の関係と後任は？', options: ['師弟・武生', '父子・代理団主', '兄弟・鼓手', '舅甥・秘書'], explain: '父子・代理団主。' },
  },
  m74: {
    en: { prompt: 'Hungry Ghost Ritual centres on which festival’s ritual opera?', options: ['Lunar New Year', 'Dragon Boat', 'Hungry Ghost (Zhongyuan)', 'Mid-Autumn'], explain: 'Hungry Ghost (Zhongyuan).' },
    ja: { prompt: '『盂蘭神功』の舞台となる祭りは？', options: ['春節', '端午', '盂蘭節（中元）', '中秋'], explain: '盂蘭節（中元）。' },
  },
  m75: {
    en: { prompt: 'In Low Pressure, Nick’s undercover role is named…?', options: ['Yu Chau', 'Cheng Fung-hei', 'Chan Tam', 'Kong Ming'], explain: 'Yu Chau.' },
    ja: { prompt: '『低圧槽』の卧底名は？', options: ['于秋', '鄭風喜', '陳探', '江銘'], explain: '于秋。' },
  },
  m76: {
    en: { prompt: 'In Conspiracy, Nick’s Malaysian PI is…?', options: ['Chan Tam', 'Cheng Fung-hei', 'Yu Chau', 'Jersey'], explain: 'Cheng Fung-hei.' },
    ja: { prompt: '『同謀』でマレーシア探偵の名は？', options: ['陳探', '鄭風喜', '于秋', '沢西'], explain: '鄭風喜。' },
  },
  m77: {
    en: { prompt: 'In Conspiracy, who plays Thai PI Chan Tam?', options: ['Sean Lau', 'Aaron Kwok', 'Louis Koo', 'Simon Yam'], explain: 'Aaron Kwok.' },
    ja: { prompt: '『同謀』で陳探役は？', options: ['劉青雲', '郭富城', '古天楽', '任達華'], explain: '郭富城。' },
  },
  m78: {
    en: { prompt: 'In Chinese Poker King / 中華賭俠, Nick’s character is…?', options: ['Ah Cool', 'Jersey', 'Chow Je-lun', 'Wong Si-fu'], explain: 'Jersey.' },
    ja: { prompt: '『中華賭俠』の役名は？', options: ['阿酷', '沢西', '周姐輪', '黄師虎'], explain: '沢西。' },
  },
  m79: {
    en: { prompt: 'In Chinese Poker King, who plays gambling king Ah Cool?', options: ['Stephen Chow', 'Louis Koo', 'Sean Lau', 'Nicholas Tse'], explain: 'Louis Koo.' },
    ja: { prompt: '『中華賭俠』で阿酷役は？', options: ['周星馳', '古天楽', '劉青雲', '謝霆鋒'], explain: '古天楽。' },
  },
  m80: {
    en: { prompt: 'In Ransom Dream (贖夢), Nick plays…?', options: ['Choi San-keung', 'Mok Chun-keung', 'Hui Lap-sang', 'Wong Fu-fan'], explain: 'Choi San-keung.' },
    ja: { prompt: '『贖夢』の役名は？', options: ['蔡辛強', '莫鎮強', '許立生', '王甫芬'], explain: '蔡辛強。' },
  },
  m81: {
    en: { prompt: 'In Daddy Wanted to Travel, Dad’s name (Nick) is…?', options: ['Mok Chun-keung', 'Mok Tsz-shan', 'Lam Tak-hong', 'Choi San-keung'], explain: 'Mok Chun-keung.' },
    ja: { prompt: '『我阿爹想旅行』で阿爹の名は？', options: ['莫鎮強', '莫子珊', '林徳康', '蔡辛強'], explain: '莫鎮強。' },
  },
  m82: {
    en: { prompt: 'In Daddy Wanted to Travel, Jennifer Yu’s daughter is… job…?', options: ['Yim Yuk-fong, travel agency boss', 'Mok Tsz-shan (Ah Shan), film art assistant', 'Qiao Lin, forensic intern', 'Ding Siu-ka, cop'], explain: 'Mok Tsz-shan (Ah Shan), film art assistant.' },
    ja: { prompt: '『我阿爹想旅行』で娘の名と仕事は？', options: ['厳玉芳・旅行社', '莫子珊（阿珊）・映画美術助手', '喬琳・法医実習', '丁小嘉・警官'], explain: '莫子珊・映画美術助手。' },
  },
  m83: {
    en: { prompt: 'In Daddy Wanted to Travel, Ah Shan is sent to props for…?', options: ['A knife', 'A large soup bowl', 'A lamp', 'A costume'], explain: 'A large soup bowl.' },
    ja: { prompt: '『我阿爹想旅行』で取りに行った道具は？', options: ['刀', '大きな湯碗', 'ランプ', '衣装'], explain: '大きな湯碗。' },
  },
  m84: {
    en: { prompt: 'After sneaking out of hospital, father and daughter go from NT to which two places?', options: ['Taiwan & Korea', 'Shenzhen & Bangkok', 'Macau & Okinawa', 'Guangzhou & Tokyo'], explain: 'Macau & Okinawa.' },
    ja: { prompt: '病院を抜けたあと訪れた二つの場所は？', options: ['台湾・韓国', '深圳・バンコク', 'マカオ・沖縄', '広州・東京'], explain: 'マカオ・沖縄。' },
  },
  m85: {
    en: { prompt: 'In Macau, Dad looks up which old friend, played by whom?', options: ['Duen Kwan by Sean Lau', 'Lam Tak-hong (Uncle Hong) by Philip Keung', 'Chan Sap-sei by Wong Jing', 'Chai Pak-hang by Raymond Lam'], explain: 'Lam Tak-hong (Uncle Hong) by Philip Keung.' },
    ja: { prompt: 'マカオの旧友と演者は？', options: ['段坤・劉青雲', '林徳康（康叔叔）・姜皓文', '陳十四・王晶', '斉百恆・林峯'], explain: '林徳康・姜皓文。' },
  },
  m86: {
    en: { prompt: 'Who plays mum Yim Yuk-fong, and what business in Okinawa?', options: ['Charmaine Sheh; karaoke', 'Mandy Mong; travel agency', 'Paw Hee-ching; cha chaan teng', 'Meng Yao; casino'], explain: 'Mandy Mong; travel agency.' },
    ja: { prompt: '母・厳玉芳の演者と沖縄の商売は？', options: ['佘詩曼・カラオケ', '蒙嘉慧・旅行社', '鮑起静・茶餐廳', '孟瑤・賭場'], explain: '蒙嘉慧・旅行社。' },
  },
  m87: {
    en: { prompt: 'In the ending, Ah Shan shoots with which star and asks if he taught Dad the “swat fly” gag?', options: ['Jackie Chan', 'Sammo Hung', 'Stephen Chow', 'Donnie Yen'], explain: 'Sammo Hung.' },
    ja: { prompt: 'エンドで共演し「拍烏蠅」を聞いた俳優は？', options: ['成龍', '洪金宝', '周星馳', '甄子丹'], explain: '洪金宝。' },
  },
}
