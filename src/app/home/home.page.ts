import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    this.setupWeatherPage();
  }
  
  private async setupWeatherPage(): Promise<void> {
    const apiKey: string = "fa64c9bd6888d0fb5110dc6561a6fe86";
    const apiCountryURL: string = "https://countryflagsapi.com/png/";
    const apiUnsplash: string = "https://source.unsplash.com/1600x900/?";
    
    const cityInput: HTMLInputElement | null = document.querySelector("#city-input");
    const searchBtn: HTMLButtonElement | null = document.querySelector("#search");
    
    const cityElement: HTMLElement | null = document.querySelector("#city");
    const tempElement: HTMLElement | null = document.querySelector("#temperature span");
    const descElement: HTMLElement | null = document.querySelector("#description");
    const weatherIconElement: HTMLImageElement | null = document.querySelector("#weather-icon");
    const countryElement: HTMLImageElement | null = document.querySelector("#country");
    const umidityElement: HTMLElement | null = document.querySelector("#umidity span");
    const windElement: HTMLElement | null = document.querySelector("#wind span");
    
    const weatherContainer: HTMLElement | null = document.querySelector("#weather-data");
    
    const errorMessageContainer: HTMLElement | null = document.querySelector("#error-message");
    const loader: HTMLElement | null = document.querySelector("#loader");
    
    const suggestionContainer: HTMLElement | null = document.querySelector("#suggestions");
    const suggestionButtons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll("#suggestions button");
    
    const toggleLoader = (): void => {
      if (loader) {
        loader.classList.toggle("hide");
      }
    };
    
    const getWeatherData = async (city: string): Promise<any> => {
      toggleLoader();
      
      const apiWeatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
      
      const res: Response = await fetch(apiWeatherURL);
      const data: any = await res.json();
      
      toggleLoader();
      
      return data;
    };
    
    const showErrorMessage = (): void => {
      if (errorMessageContainer) {
        errorMessageContainer.classList.remove("hide");
      }
    };
    
    const hideInformation = (): void => {
      if (errorMessageContainer && weatherContainer && suggestionContainer) {
        errorMessageContainer.classList.add("hide");
        weatherContainer.classList.add("hide");
        suggestionContainer.classList.add("hide");
      }
    };
    
    const showWeatherData = async (city: string): Promise<void> => {
      hideInformation();
      
      const data: any = await getWeatherData(city);
      
      if (data.cod === "404") {
        showErrorMessage();
        return;
      }
      
      if (cityElement && tempElement && descElement && weatherIconElement && countryElement && umidityElement && windElement) {
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp).toString();
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        countryElement.setAttribute("src", apiCountryURL + data.sys.country);
        umidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;
      }
      
      // Change bg image
      if (document.body) {
        document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
      }
      
      if (weatherContainer) {
        weatherContainer.classList.remove("hide");
      }
    };
    
    if (searchBtn && cityInput) {
      searchBtn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        
        const city: string = cityInput.value;
        
        showWeatherData(city);
      });
      
      cityInput.addEventListener("keyup", (e: KeyboardEvent) => {
        if (e.code === "Enter" && cityInput) {
          const city: string = cityInput.value;
          
          showWeatherData(city);
        }
      });
    }
    
    if (suggestionButtons) {
      suggestionButtons.forEach((btn: HTMLButtonElement) => {
        btn.addEventListener("click", () => {
          const city: string | null = btn.getAttribute("id");
          
          if (city) {
            showWeatherData(city);
          }
        });
      });
    }
  }
}
