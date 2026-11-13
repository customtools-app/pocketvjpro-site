// Contact links without a plain email address in the HTML.
// Spam bots harvest addresses from page source, so each link carries only the
// mailbox name (data-mail="support") and the address is put together in the
// browser when a person clicks. No address, "@" or "mailto:" with an address
// is ever present in the published files.
//
//   <a href="#" data-mail="support" data-subject="Help">Email support</a>
//     data-subject  optional subject line for the new email
//     data-reveal   swap the link text for the address after the click,
//                   so it can be read or copied if no mail app opens
//     data-open="no"  only reveal the address, do not open a mail app
(function () {
  var DOMAIN_PARTS = ['customtools', 'app'];

  function buildAddress(mailbox) {
    return mailbox + String.fromCharCode(64) + DOMAIN_PARTS.join('.');
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('[data-mail]') : null;
    if (!link) return;
    event.preventDefault();

    var address = buildAddress(link.getAttribute('data-mail'));
    var subject = link.getAttribute('data-subject');
    var mailUrl = 'mailto:' + address + (subject ? '?subject=' + encodeURIComponent(subject) : '');

    if (link.hasAttribute('data-reveal')) {
      link.textContent = address;
      link.style.userSelect = 'all';
      link.style.webkitUserSelect = 'all';
    }
    if (link.tagName === 'A') link.setAttribute('href', mailUrl);
    if (link.getAttribute('data-open') !== 'no') window.location.href = mailUrl;
  });
})();
