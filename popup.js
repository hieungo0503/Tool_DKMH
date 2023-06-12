
document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.querySelector('.input-mmh')
    const sendButton = document.getElementById('sendButton');
    const pauseButton = document.getElementById('pauseButton');
    const inputToken = document.querySelector('.token')
    const apikey = document.querySelector('.apikey')
    sendButton.addEventListener('click', () => {
        const api = apikey.value.trim();
        const token = inputToken.value.trim();
        const text = inputBox.value.trim();
        const MaLop = text.split("_")[0]
        const interval = setInterval(()=>{
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {
                  action: 'sendAPIRequest',
                  url: 'https://dangkyapi.hcmute.edu.vn/api/student/GetClassStudyUnitAllowRegist',
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5',
                    'Authorization': token,
                    'Connection': 'keep-alive',
                    'Content-Length': '672',
                    'Content-Type': 'application/json',
                    'Host': 'dangkyapi.hcmute.edu.vn',
                    'Origin': 'https://dkmh.hcmute.edu.vn',
                    'Referer': 'https://dkmh.hcmute.edu.vn/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                    'apiKey': api,
                    'clientId': 'dtl',
                  },
                  body: {p2: MaLop},
                }, (response) => {
                  if (response?.error) {
                    console.error(response.error);
                  } else {
                    response.forEach(element => {
                        if(element.CurriculumID === text){
                            const selectedElement = element;
                            chrome.tabs.sendMessage(activeTab.id, {
                                action: 'sendAPIRequest',
                                url: 'https://dangkyapi.hcmute.edu.vn/api/student/PostRegist?IdDot=4&Action=REGIST&Token=hoW6djUtNdatnOVgJuSbefWQPiA1Kl66rqXPHcXl37q2c6GIsmYWYoHVDDCnPv4Lf%2BeXwJBLTNGYtUHZ5H67MQ%3D%3D',
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json, text/plain, */*',
                                  'Accept-Encoding': 'gzip, deflate, br',
                                  'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5',
                                  'Authorization': token,
                                  'Connection': 'keep-alive',
                                  'Content-Length': '672',
                                  'Content-Type': 'application/json',
                                  'Host': 'dangkyapi.hcmute.edu.vn',
                                  'Origin': 'https://dkmh.hcmute.edu.vn',
                                  'Referer': 'https://dkmh.hcmute.edu.vn/',
                                  'Sec-Fetch-Dest': 'empty',
                                  'Sec-Fetch-Mode': 'cors',
                                  'Sec-Fetch-Site': 'same-site',
                                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                                  'apiKey': api,
                                  'clientId': 'dtl',
                                },
                                body: 
                                [{ // Thay đổi đối tượng body theo yêu cầu của bạn
                                  ...selectedElement,
                                  "isOpen": true
                                }],
                              }, (response) => {
                                if (response?.error) {
                                  console.log('Lớp học phần đã full.!!!');
                                } else {
                                  console.log(response);
                                }
                              })
                          }
                        });
                        }
                    });
                   
              });
        },1000)
        pauseButton.addEventListener('click',()=>{
            clearInterval(interval);
        }) 
    });
  });