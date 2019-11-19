import toastr from "toastr";

toastr.options = {
  positionClass: 'toast-bottom-right'
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.getElementById('send').addEventListener('click', () => {
  document.getElementById("send").disabled = true;
  const name = document.getElementById('name');
  const contact = document.getElementById('contact');
  const message = document.getElementById('message');
  const access_token = "s88zf1ka8efjwksygzya2uet";
  const subject = "message from pride";
  const text = JSON.stringify({
    name: encodeURIComponent(name.value),
    contact: encodeURIComponent(contact.value),
    message: encodeURIComponent(message.value)
  })
  var xhr = new XMLHttpRequest();


  xhr.open("POST", "https://postmail.invotes.com/send", true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      $('#modal').modal('hide');
      toastr.success('Мы свяжемся с Вами в ближайшее время.', 'Спасибо!')
      name.value = '';
      contact.value = '';
      message.value = '';
      document.getElementById("send").disabled = false;
    }
  }
  xhr.send(toParams({ access_token, subject, text }));
})


function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}