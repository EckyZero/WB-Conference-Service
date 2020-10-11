
exports.seed = async function(knex) {
  // DELETE all database
  await knex('talk_topics').del()
  await knex('topics').del()
  await knex('talks').del()
  await knex('sessions').del()
  await knex('conferences').del()
  await knex('speakers').del()
  await knex('callings').del()
  await knex('people').del()  

  // CREATE all database
  await knex('callings').insert([
    {
      calling_uid: '77d43379-32c7-4607-a1f9-5c689764ac3e', 
      role: 'Of the Seventy',
      title: 'Elder'
    },
    {
      calling_uid: '78d2e2cc7b4340e3e51689d9495e241f', 
      role: 'First Counselor in the Primary General Presidency',
      title: 'Sister'
    },
  ]);

  await knex('people').insert([
    {
      person_uid: '94933876b2b6c6987d327ff1b82edff5', 
      preferred_name: 'John A. McCune',
      first_name: 'John', 
      middle_name: 'A',
      last_name: 'McCune'
    },
    {
      person_uid: 'aa182138b3c3c25cda5de2916cb1757c', 
      preferred_name: 'Lisa L. Harkness',
      first_name: 'Lisa', 
      middle_name: 'L',
      last_name: 'Harkness'
    },
  ]);

  await knex('speakers').insert([
    {
      speaker_uid: '51bf5732adf7df4bc9a479a9d8c42d80', 
      calling_uid: '77d4337932c74607a1f95c689764ac3e',
      person_uid: '94933876b2b6c6987d327ff1b82edff5'
    },
    {
      speaker_uid: '705fbf70c70fdb5a03733c9860ca988c', 
      calling_uid: '78d2e2cc7b4340e3e51689d9495e241f',
      person_uid: 'aa182138b3c3c25cda5de2916cb1757c'
    },
  ]);

  await knex('conferences').insert([
    {
      conference_uid: '55ddc2480b90e16fd2f5a34d99961d79', 
      year: 2019,
      month: 10
    },
    {
      conference_uid: '273d99b9846fa3114b2b2a5066323fea', 
      year: 2020,
      month: 4
    },
  ]);

  await knex('sessions').insert([
    {
      session_uid: '17adee56d6492de760616bb7e4c88213', 
      name: 'Saturday Afternoon Session',
      conference_order: 1,
      conference_uid: '273d99b9846fa3114b2b2a5066323fea'
    },
    {
      session_uid: 'a4337aa603c95d107c020e916f2c43e5', 
      name: 'Women’s Session',
      conference_order: 2,
      conference_uid: '55ddc2480b90e16fd2f5a34d99961d79'
    },
  ]);

  await knex('topics').insert([
    {
      topic_uid: 'dae5b0db73a1eaf5af865d6ea8eb90b7', 
      title: 'Jesus Christ',
      tag: 'jesus-christ', 
      reference_url: 'https://www.churchofjesuschrist.org/general-conference/topics/-Jesus-Christ?lang=eng&encoded=true',
      talks_count: null,
    },
    {
      topic_uid: 'fefa79731a1373cf77c1d0bdd96b8d59', 
      title: 'temples',
      tag: 'temples', 
      reference_url: 'https://www.churchofjesuschrist.org/general-conference/topics/-temples?lang=eng&encoded=true',
      talks_count: null
    },
    {
      topic_uid: '81664d3efa18c18ca06c3c7f51546baf', 
      title: 'Aaronic Priesthood',
      tag: 'aaronic-priesthood', 
      reference_url: 'https://www.churchofjesuschrist.org/general-conference/topics/Aaronic-Priesthood?lang=eng&encoded=true',
      talks_count: null
    }
  ]);

  await knex('talks').insert([
    {
      talk_uid: 'b9b1073511fd7f33da194b2555e3393c', 
      title: 'Honoring His Name',
      description: "Sister Harkness teaches what it means to take upon ourselves the name of Jesus Christ and always remember Him.",
      quote: 'With covenant identity and belonging, we are called by the name of Jesus Christ.',
      thumbnail_url: 'https://mediasrv.churchofjesuschrist.org/media-services/GA/thumbnail/6092601061001',
      reference_url: 'https://www.churchofjesuschrist.org/general-conference/2019/10/32harkness?lang=eng',
      session_order: 1,
      session_uid: 'a4337aa603c95d107c020e916f2c43e5',
      speaker_uid: '705fbf70c70fdb5a03733c9860ca988c'
    },
    {
      talk_uid: '44cc70a5e439012f24d7677ab008dbb4', 
      title: 'Come unto Christ—Living as Latter-day Saints',
      description: "Elder McCune teaches us how the restored gospel of Jesus Christ helps us to do difficult things and help others do the same.",
      quote: 'We can do difficult things and help others do the same, because we know in whom we can trust.',
      thumbnail_url: 'https://mediasrv.churchofjesuschrist.org/media-services/GA/thumbnail/6147129480001',
      reference_url: 'https://www.churchofjesuschrist.org/general-conference/2020/04/24mccune?lang=eng',
      session_order: 3,
      session_uid: '17adee56d6492de760616bb7e4c88213',
      speaker_uid: '51bf5732adf7df4bc9a479a9d8c42d80'
    },
  ]);

  await knex('talk_topics').insert([
    {
      talk_topic_uid: 'ab241dda540b6980996c573342ce0fd2',
      talk_uid: '44cc70a5e439012f24d7677ab008dbb4',
      topic_uid: 'dae5b0db73a1eaf5af865d6ea8eb90b7'
    },
    {
      talk_topic_uid: '0f3210e7923ad29b628972d1aa12abd8',
      talk_uid: 'b9b1073511fd7f33da194b2555e3393c',
      topic_uid: 'dae5b0db73a1eaf5af865d6ea8eb90b7'
    }
  ])
};
