import { Selector } from 'testcafe';

fixture`Nunjucks with Gulp static page example`
  .page`http://localhost:8080/index.html`;

test('index page test', async test => {
  const navigation = Selector('nav');
  const aboutLink = Selector('a').withText('About');
  const paragraph = Selector('p');

  await test
    .expect(navigation.exists && navigation.visible).eql(true)
    .expect(paragraph.innerText).contains('Welcome')
    .click(aboutLink);

  const location = await test.eval(() => window.location);
  await test.expect(location.pathname).eql('/about.html');
});

test.page `http://localhost:8080/about.html`
('about page test', async test => {
  const navigation = Selector('nav');
  const contactLink = Selector('a').withText('Contact');
  const paragraph = Selector('p');

  await test
    .expect(navigation.exists && navigation.visible).eql(true)
    .expect(paragraph.innerText).contains('static site')
    .click(contactLink);

  const location = await test.eval(() => window.location);
  await test.expect(location.pathname).eql('/contact.html');
});

test.page `http://localhost:8080/contact.html`
('contact page test', async test => {
  const navigation = Selector('nav');
  const homeLink = Selector('a').withText('Home');
  const paragraph = Selector('p');

  await test
    .expect(navigation.exists && navigation.visible).eql(true)
    .expect(paragraph.innerText).contains('example')
    .click(homeLink);

  const location = await test.eval(() => window.location);
  await test.expect(location.pathname).eql('/index.html');
});
