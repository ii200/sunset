// ---------- DOM ----------
const stepWelcome = document.getElementById("stepWelcome");
const stepLoading = document.getElementById("stepLoading");
const stepResult = document.getElementById("stepResult");

const btnGeo = document.getElementById("btnGeo");
const btnIp = document.getElementById("btnIp");
const btnRestart = document.getElementById("btnRestart");
const btnTryAgain = document.getElementById("btnTryAgain");
const btnCopy = document.getElementById("btnCopy");

const btnManualOpen = document.getElementById("btnManualOpen");
const manualBox = document.getElementById("manualBox");
const btnManualGo = document.getElementById("btnManualGo");
const latInput = document.getElementById("lat");
const lonInput = document.getElementById("lon");

const welcomeError = document.getElementById("welcomeError");
const resultError = document.getElementById("resultError");

const loadingLine = document.getElementById("loadingLine");
const langPill = document.getElementById("langPill");

const pillProvider = document.getElementById("pillProvider");
const pillCoords = document.getElementById("pillCoords");
const scoreNum = document.getElementById("scoreNum");
const scoreLabel = document.getElementById("scoreLabel");
const barFill = document.getElementById("barFill");
const reasons = document.getElementById("reasons");

const sunsetWindow = document.getElementById("sunsetWindow");
const timeZoneVal = document.getElementById("timeZoneVal");

const capTitle = document.getElementById("capTitle");
const capSub = document.getElementById("capSub");

const copyToast = document.getElementById("copyToast");

// Color UI
const palette = document.getElementById("palette");
const tonePill = document.getElementById("tonePill");
const toneMeta = document.getElementById("toneMeta");
const colorSub = document.getElementById("colorSub");

// Tone scene
const toneScene = document.getElementById("toneScene");
const toneSunPath = toneScene ? toneScene.querySelector(".toneSunPath") : null;
const toneHaze = toneScene ? toneScene.querySelector(".toneHaze") : null;
const toneStars = toneScene ? toneScene.querySelector(".toneStars") : null;
const toneWater = toneScene ? toneScene.querySelector(".toneWater") : null;
const toneSun = toneScene ? toneScene.querySelector(".toneSun") : null;
const toneClouds = toneScene ? Array.from(toneScene.querySelectorAll(".toneCloud")) : [];

// ---------- i18n ----------
function detectLang()
{
	const raw = (navigator.languages && navigator.languages[0]) ? navigator.languages[0] : (navigator.language || "en");
	const lower = raw.toLowerCase();

	if (lower.startsWith("ru")) return "ru";
	if (lower.startsWith("es")) return "es";
	return "en";
}

const LANG = detectLang();

const I18N =
{
	ru:
	{
		lang_name: "RU",
		h1: "Красивый закат сегодня?",
		lead: "Я оценю вероятность по облачности, осадкам и видимости — и объясню почему.",
		btn_geo_title: "По геолокации",
		btn_geo_desc: "Точнее",
		btn_ip_title: "По IP",
		btn_ip_desc: "Быстрее",
		manual_note: "Можно и вручную:",
		manual_open: "ввести координаты",
		manual_go: "Проверить",
		manual_hint: "Подсказка: Буэнос-Айрес ≈ -34.6037, -58.3816",
		badge_title: "Солнечный прогноз",
		badge_sub: "1 клик → вероятность + объяснение",

		loading_title: "Считаю…",
		loading_tip: "Эвристика ≠ гарантия. Лучший результат — с точной геолокацией.",
		loading_steps:
		[
			"Подключаюсь к погодному провайдеру",
			"Получаю время заката и слои облачности",
			"Получаю аэрозоли/дымку (воздух)",
			"Собираю гипотезу и объяснение"
		],

		source: "Источник",
		sunset_window: "Окно заката",
		timezone: "Часовой пояс",
		why: "Почему так думаю",
		try_again: "Проверить снова",
		copy: "Скопировать",
		copied: "Скопировано!",
		copy_failed: "Не удалось скопировать",

		window_unknown: "Вечернее окно: 18:30–20:30 (оценка)",
		caption_title_exact: "Окно заката",
		caption_sub_exact: "Оценка основана на погоде около времени заката.",
		caption_title_approx: "Вечернее окно",
		caption_sub_approx: "Точное время заката недоступно у текущего источника — оценка взята на вечер.",

		label_very_high: "Очень высокий шанс",
		label_high: "Высокий шанс",
		label_mid: "Средний шанс",
		label_low: "Низкий шанс",

		color_title: "Прогноз палитры",
		color_sub: "Оценка тона зависит от облаков, видимости и аэрозолей/дымки.",
		tone_golden: "Золотой",
		tone_pink: "Розово-фиолетовый",
		tone_red: "Красно-оранжевый",
		tone_muted: "Пастель/дымка",
		tone_grey: "Серый/приглушённый",
		tone_meta: "Вероятности: {gold}% золото · {pink}% розовый · {red}% красный · {muted}% пастель",

		err_geo: "Не удалось получить геолокацию.",
		err_coords: "Введите корректные lat/lon.",
		err_ip: "Не удалось определить локацию по IP.",

		footer: "Всё имеет свой закат, только ночь заканчивается рассветом."
	},
	en:
	{
		lang_name: "EN",
		h1: "Beautiful sunset today?",
		lead: "I estimate the chance using clouds, precipitation and visibility — with an explanation.",
		btn_geo_title: "Use geolocation",
		btn_geo_desc: "More accurate",
		btn_ip_title: "Use IP",
		btn_ip_desc: "Faster",
		manual_note: "Or manually:",
		manual_open: "enter coordinates",
		manual_go: "Check",
		manual_hint: "Tip: Buenos Aires ≈ -34.6037, -58.3816",
		badge_title: "Sunset forecast",
		badge_sub: "1 click → chance + explanation",

		loading_title: "Calculating…",
		loading_tip: "Heuristic ≠ guarantee. Best results with accurate geolocation.",
		loading_steps:
		[
			"Connecting to a weather provider",
			"Fetching sunset time and cloud layers",
			"Fetching aerosols/haze (air)",
			"Building a score and explanation"
		],

		source: "Source",
		sunset_window: "Sunset window",
		timezone: "Time zone",
		why: "Why this score",
		try_again: "Try again",
		copy: "Copy",
		copied: "Copied",
		copy_failed: "Copy failed",

		window_unknown: "Evening window: 18:30–20:30 (estimate)",
		caption_title_exact: "Sunset window",
		caption_sub_exact: "Score is based on the weather around sunset time.",
		caption_title_approx: "Evening window",
		caption_sub_approx: "Exact sunset time is unavailable for this source — evening estimate used.",

		label_very_high: "Very high chance",
		label_high: "High chance",
		label_mid: "Medium chance",
		label_low: "Low chance",

		color_title: "Predicted palette",
		color_sub: "Tone depends on clouds, visibility and aerosols/haze.",
		tone_golden: "Golden",
		tone_pink: "Pink / Purple",
		tone_red: "Red / Orange",
		tone_muted: "Pastel / Haze",
		tone_grey: "Grey / Muted",
		tone_meta: "Odds: {gold}% golden · {pink}% pink · {red}% red · {muted}% pastel",

		err_geo: "Could not get geolocation.",
		err_coords: "Please enter valid lat/lon.",
		err_ip: "Could not detect IP location.",

		footer: "Everything has its sunset, only the night ends with dawn."
	},
	es:
	{
		lang_name: "ES",
		h1: "¿Atardecer lindo hoy?",
		lead: "Estimo la probabilidad según nubes, precipitación y visibilidad — con explicación.",
		btn_geo_title: "Usar geolocalización",
		btn_geo_desc: "Más preciso",
		btn_ip_title: "Usar IP",
		btn_ip_desc: "Más rápido",
		manual_note: "O manual:",
		manual_open: "ingresar coordenadas",
		manual_go: "Verificar",
		manual_hint: "Tip: Buenos Aires ≈ -34.6037, -58.3816",
		badge_title: "Pronóstico de atardecer",
		badge_sub: "1 click → probabilidad + explicación",

		loading_title: "Calculando…",
		loading_tip: "Heurística ≠ garantía. Mejor con geolocalización precisa.",
		loading_steps:
		[
			"Conectando con un proveedor del clima",
			"Obteniendo hora del atardecer y capas de nubes",
			"Obteniendo aerosoles/neblina (aire)",
			"Armando puntaje y explicación"
		],

		source: "Fuente",
		sunset_window: "Ventana del atardecer",
		timezone: "Zona horaria",
		why: "Por qué este puntaje",
		try_again: "Probar de nuevo",
		copy: "Copiar",
		copied: "Copiado",
		copy_failed: "No se pudo copiar",

		window_unknown: "Ventana: 18:30–20:30 (estimación)",
		caption_title_exact: "Ventana del atardecer",
		caption_sub_exact: "El puntaje se basa en el clima cerca del atardecer.",
		caption_title_approx: "Ventana de la tarde",
		caption_sub_approx: "No hay hora exacta para esta fuente — se usa una estimación vespertina.",

		label_very_high: "Probabilidad muy alta",
		label_high: "Probabilidad alta",
		label_mid: "Probabilidad media",
		label_low: "Probabilidad baja",

		color_title: "Paleta estimada",
		color_sub: "El tono depende de nubes, visibilidad y aerosoles/neblina.",
		tone_golden: "Dorado",
		tone_pink: "Rosa / Violeta",
		tone_red: "Rojo / Naranja",
		tone_muted: "Pastel / Neblina",
		tone_grey: "Gris / Apagado",
		tone_meta: "Prob.: {gold}% dorado · {pink}% rosa · {red}% rojo · {muted}% pastel",

		err_geo: "No se pudo obtener la geolocalización.",
		err_coords: "Ingresá lat/lon válidos.",
		err_ip: "No se pudo detectar ubicación por IP.",

		footer: "Todo tiene su ocaso, sólo la noche termina con el amanecer."
	}
};

const T = I18N[LANG] || I18N.en;

function applyI18n()
{
	document.querySelectorAll("[data-i18n]").forEach(el =>
	{
		const key = el.getAttribute("data-i18n");
		if (T[key] !== undefined)
		{
			el.textContent = T[key];
		}
	});

	langPill.textContent = `UI: ${T.lang_name}`;
	colorSub.textContent = T.color_sub;
}

// ---------- UI helpers ----------
function showPanel(panel)
{
	[stepWelcome, stepLoading, stepResult].forEach(p => p.classList.remove("isActive"));
	panel.classList.add("isActive");
}

function setError(el, text)
{
	if (!text)
	{
		el.classList.add("hidden");
		el.textContent = "";
		return;
	}
	el.textContent = text;
	el.classList.remove("hidden");
}

function clamp(v, min, max)
{
	return Math.min(max, Math.max(min, v));
}

function clamp01(v)
{
	return Math.min(1, Math.max(0, v));
}

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, timeoutMs = 14000, headers = {})
{
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try
	{
		const res = await fetch(url,
		{
			signal: controller.signal,
			headers,
			cache: "no-store"
		});

		if (!res.ok)
		{
			throw new Error(`HTTP ${res.status}`);
		}

		return await res.json();
	}
	finally
	{
		clearTimeout(timer);
	}
}

async function fetchWithRetries(url, timeoutMs, headers, retries = 2)
{
	let last = null;

	for (let i = 0; i <= retries; i++)
	{
		try
		{
			return await fetchWithTimeout(url, timeoutMs, headers);
		}
		catch (e)
		{
			last = e;
			await sleep(220 + i * 220);
		}
	}

	throw last || new Error("Fetch failed");
}

// ---------- Scoring ----------
function scoreSunset(m)
{
	let score = 50;
	const reasonKeys = [];

	if (m.precipitation !== null && m.precipitation > 0.5)
	{
		score -= 20;
		reasonKeys.push("rain_bad");
	}
	else
	{
		score += 3;
		reasonKeys.push("rain_good");
	}

	if (m.cloud_cover_low !== null)
	{
		if (m.cloud_cover_low > 60)
		{
			score -= 25;
			reasonKeys.push("low_clouds_bad");
		}
		else if (m.cloud_cover_low > 40)
		{
			score -= 10;
			reasonKeys.push("low_clouds_mid");
		}
		else
		{
			score += 10;
			reasonKeys.push("low_clouds_good");
		}
	}

	const mid = m.cloud_cover_mid ?? 0;
	const high = m.cloud_cover_high ?? 0;
	const combo = mid * 0.6 + high * 0.4;

	if (combo >= 25 && combo <= 60)
	{
		score += 18;
		reasonKeys.push("upper_clouds_gold");
	}
	else if (combo < 15)
	{
		score -= 2;
		reasonKeys.push("upper_clouds_flat");
	}
	else if (combo > 75)
	{
		score -= 12;
		reasonKeys.push("upper_clouds_block");
	}
	else
	{
		score += 6;
		reasonKeys.push("upper_clouds_some");
	}

	if (m.visibility !== null)
	{
		if (m.visibility / 1000 < 8)
		{
			score -= 10;
			reasonKeys.push("vis_bad");
		}
		else
		{
			score += 6;
			reasonKeys.push("vis_good");
		}
	}

	if (m.relative_humidity_2m !== null && m.relative_humidity_2m > 85)
	{
		score -= 8;
		reasonKeys.push("hum_bad");
	}

	score = clamp(Math.round(score), 0, 100);

	let labelKey = "label_mid";
	if (score >= 90) labelKey = "label_very_high";
	else if (score >= 75) labelKey = "label_high";
	else if (score <= 30) labelKey = "label_low";

	return { score, labelKey, reasonKeys };
}

const REASONS =
{
	ru:
	{
		rain_bad: "Осадки рядом с закатом часто «съедают» свет и контраст.",
		rain_good: "Осадки не мешают — это плюс для чистых цветов.",
		low_clouds_bad: "Низкая облачность может закрыть линию горизонта.",
		low_clouds_mid: "Низкая облачность заметная — горизонт может быть частично закрыт.",
		low_clouds_good: "Горизонт скорее открыт — шанс красивой линии заката выше.",
		upper_clouds_gold: "Средние/высокие облака в «золотом диапазоне» — красиво подсвечиваются.",
		upper_clouds_flat: "Мало облаков для драматичного света — может быть «ровно».",
		upper_clouds_block: "Слишком плотная облачность может «забетонировать» небо.",
		upper_clouds_some: "Облака присутствуют — есть что подсвечивать.",
		vis_bad: "Низкая видимость (дымка/туман) часто гасит цвета.",
		vis_good: "Хорошая видимость — цвета читаются лучше.",
		hum_bad: "Высокая влажность даёт дымку и снижает контраст."
	},
	en:
	{
		rain_bad: "Precipitation around sunset often kills light and contrast.",
		rain_good: "No precipitation nearby — better for clean colors.",
		low_clouds_bad: "Low clouds can block the horizon line.",
		low_clouds_mid: "Noticeable low clouds may partially block the horizon.",
		low_clouds_good: "Horizon is likely open — better odds for a clean sunset line.",
		upper_clouds_gold: "Mid/high clouds in the “golden range” glow beautifully.",
		upper_clouds_flat: "Too few clouds — the sunset may look flat.",
		upper_clouds_block: "Very dense cloud cover can completely mute the sky.",
		upper_clouds_some: "Some clouds present — there’s something to catch the light.",
		vis_bad: "Low visibility (haze/fog) often washes out colors.",
		vis_good: "Good visibility — colors read better.",
		hum_bad: "High humidity adds haze and reduces contrast."
	},
	es:
	{
		rain_bad: "La precipitación cerca del atardecer suele apagar la luz y el contraste.",
		rain_good: "Sin precipitación cerca — mejor para colores limpios.",
		low_clouds_bad: "Las nubes bajas pueden tapar el horizonte.",
		low_clouds_mid: "Nubes bajas notables pueden tapar parte del horizonte.",
		low_clouds_good: "El horizonte probablemente está abierto — mejor chance.",
		upper_clouds_gold: "Nubes medias/altas en el “rango dorado” se iluminan muy lindo.",
		upper_clouds_flat: "Pocas nubes — puede verse más plano.",
		upper_clouds_block: "Nubosidad muy densa puede apagar el cielo.",
		upper_clouds_some: "Hay nubes — algo puede atrapar la luz.",
		vis_bad: "Baja visibilidad (neblina/niebla) suele apagar colores.",
		vis_good: "Buena visibilidad — los colores se leen mejor.",
		hum_bad: "Humedad alta agrega neblina y baja el contraste."
	}
};

// ---------- Providers ----------
function pickClosestIndex(times, targetMs)
{
	let best = 0;
	let diff = Infinity;

	times.forEach((t, i) =>
	{
		const d = Math.abs(new Date(t).getTime() - targetMs);
		if (d < diff)
		{
			diff = d;
			best = i;
		}
	});

	return best;
}

async function getDataOpenMeteo(lat, lon)
{
	const cacheBust = Date.now();

	const url =
		`https://api.open-meteo.com/v1/forecast` +
		`?latitude=${lat}&longitude=${lon}` +
		`&hourly=cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation,visibility,relative_humidity_2m` +
		`&daily=sunset` +
		`&forecast_days=1` +
		`&timezone=auto` +
		`&_=${cacheBust}`;

	const data = await fetchWithRetries(url, 16000, {}, 2);

	const tz = data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
	const sunsetIso = data.daily?.sunset?.[0] || null;

	let targetMs = null;

	if (sunsetIso)
	{
		targetMs = new Date(sunsetIso).getTime();
	}
	else
	{
		const now = new Date();
		targetMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0).getTime();
	}

	const times = data.hourly.time;
	const best = pickClosestIndex(times, targetMs);

	return {
		provider: "open-meteo",
		timezone: tz,
		sunsetIso,
		targetMs,
		metrics:
		{
			cloud_cover_low: data.hourly.cloud_cover_low?.[best] ?? null,
			cloud_cover_mid: data.hourly.cloud_cover_mid?.[best] ?? null,
			cloud_cover_high: data.hourly.cloud_cover_high?.[best] ?? null,
			precipitation: data.hourly.precipitation?.[best] ?? null,
			visibility: data.hourly.visibility?.[best] ?? null,
			relative_humidity_2m: data.hourly.relative_humidity_2m?.[best] ?? null
		}
	};
}

function pickClosestTimeSeries(timeseries, targetDate)
{
	let best = timeseries[0];
	let bestDiff = Infinity;

	for (const t of timeseries)
	{
		const d = Math.abs(new Date(t.time).getTime() - targetDate.getTime());
		if (d < bestDiff)
		{
			bestDiff = d;
			best = t;
		}
	}

	return best;
}

async function getDataMetNo(lat, lon)
{
	const cacheBust = Date.now();
	const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&_=${cacheBust}`;

	const data = await fetchWithRetries(
		url,
		16000,
		{
			"User-Agent": "sunset-chance/1.0 (contact: local-dev)",
			"Accept": "application/json"
		},
		1
	);

	const series = data?.properties?.timeseries ?? [];
	if (!series.length)
	{
		throw new Error("MET.no: empty timeseries");
	}

	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "local";

	const now = new Date();
	const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);

	const snap = pickClosestTimeSeries(series, target);
	const details = snap?.data?.instant?.details ?? {};
	const next1h = snap?.data?.next_1_hours?.details ?? {};
	const next6h = snap?.data?.next_6_hours?.details ?? {};

	const cloudTotal = details.cloud_area_fraction ?? null;
	const precip = next1h.precipitation_amount ?? next6h.precipitation_amount ?? null;

	return {
		provider: "met.no",
		timezone: tz,
		sunsetIso: null,
		targetMs: target.getTime(),
		metrics:
		{
			cloud_cover_low: cloudTotal,
			cloud_cover_mid: null,
			cloud_cover_high: null,
			precipitation: precip,
			visibility: null,
			relative_humidity_2m: details.relative_humidity ?? null
		}
	};
}

async function getAirOpenMeteo(lat, lon, targetMs)
{
	const cacheBust = Date.now();

	const url =
		`https://air-quality-api.open-meteo.com/v1/air-quality` +
		`?latitude=${lat}&longitude=${lon}` +
		`&hourly=aerosol_optical_depth,dust,pm2_5` +
		`&forecast_days=1` +
		`&timezone=auto` +
		`&_=${cacheBust}`;

	const data = await fetchWithRetries(url, 16000, {}, 1);

	const tz = data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
	const times = data.hourly?.time ?? [];

	if (!times.length)
	{
		return { timezone: tz, aod: null, dust: null, pm25: null };
	}

	const idx = pickClosestIndex(times, targetMs);

	const aod = data.hourly?.aerosol_optical_depth?.[idx] ?? null;
	const dust = data.hourly?.dust?.[idx] ?? null;
	const pm25 = data.hourly?.pm2_5?.[idx] ?? null;

	return { timezone: tz, aod, dust, pm25 };
}

async function getDataFromProviders(lat, lon)
{
	const providers =
	[
		{ name: "Open-Meteo", fn: getDataOpenMeteo },
		{ name: "MET Norway", fn: getDataMetNo }
	];

	let lastError = null;

	for (const p of providers)
	{
		try
		{
			setLoadingLine(`${T.loading_steps[0]}: ${p.name}`);
			return await p.fn(lat, lon);
		}
		catch (e)
		{
			lastError = e;
		}
	}

	throw lastError || new Error("No providers available");
}

// ---------- Geo ----------
function getBrowserGeo()
{
	return new Promise((resolve, reject) =>
	{
		if (!navigator.geolocation)
		{
			reject(new Error("Geolocation unavailable"));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) =>
			{
				resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
			},
			(err) => reject(err),
			{
				timeout: 20000,
				enableHighAccuracy: false,
				maximumAge: 120000
			}
		);
	});
}

async function getIpGeo()
{
	const providers =
	[
		async () =>
		{
			const geo = await fetchWithRetries("https://ipapi.co/json/?_=" + Date.now(), 12000, {}, 1);
			if (!geo || geo.latitude === undefined || geo.longitude === undefined) throw new Error("ipapi.co invalid");
			return { lat: Number(geo.latitude), lon: Number(geo.longitude) };
		},
		async () =>
		{
			const geo = await fetchWithRetries("https://ipwho.is/?_=" + Date.now(), 12000, {}, 1);
			if (!geo || geo.success === false || geo.latitude === undefined || geo.longitude === undefined) throw new Error("ipwho.is invalid");
			return { lat: Number(geo.latitude), lon: Number(geo.longitude) };
		}
	];

	let last = null;

	for (const fn of providers)
	{
		try
		{
			return await fn();
		}
		catch (e)
		{
			last = e;
		}
	}

	throw last || new Error("IP geo failed");
}

// ---------- Time formatting ----------
function formatTime(date, timeZone)
{
	try
	{
		return new Intl.DateTimeFormat(LANG, { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(date);
	}
	catch
	{
		return new Intl.DateTimeFormat(LANG, { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
	}
}

function buildSunsetWindow(sunsetIso, timeZone)
{
	if (!sunsetIso)
	{
		return { text: T.window_unknown, isExact: false };
	}

	const center = new Date(sunsetIso);
	const from = new Date(center.getTime() - 40 * 60 * 1000);
	const to = new Date(center.getTime() + 15 * 60 * 1000);

	const fromTxt = formatTime(from, timeZone);
	const toTxt = formatTime(to, timeZone);

	return { text: `${fromTxt}–${toTxt}`, isExact: true };
}

// ---------- Loading ticker ----------
let loadingTicker = null;

function setLoadingLine(text)
{
	loadingLine.textContent = text;
}

function startLoadingTicker()
{
	let i = 0;
	setLoadingLine(T.loading_steps[0]);

	loadingTicker = setInterval(() =>
	{
		i = (i + 1) % T.loading_steps.length;
		setLoadingLine(T.loading_steps[i]);
	}, 1200);
}

function stopLoadingTicker()
{
	if (loadingTicker)
	{
		clearInterval(loadingTicker);
		loadingTicker = null;
	}
}

// ---------- Color prediction ----------
function lerp(a, b, t)
{
	return a + (b - a) * t;
}

function mixHex(a, b, t)
{
	const pa = a.replace("#", "");
	const pb = b.replace("#", "");

	const ar = parseInt(pa.slice(0, 2), 16);
	const ag = parseInt(pa.slice(2, 4), 16);
	const ab = parseInt(pa.slice(4, 6), 16);

	const br = parseInt(pb.slice(0, 2), 16);
	const bg = parseInt(pb.slice(2, 4), 16);
	const bb = parseInt(pb.slice(4, 6), 16);

	const rr = Math.round(lerp(ar, br, t)).toString(16).padStart(2, "0");
	const rg = Math.round(lerp(ag, bg, t)).toString(16).padStart(2, "0");
	const rb = Math.round(lerp(ab, bb, t)).toString(16).padStart(2, "0");

	return `#${rr}${rg}${rb}`;
}

function predictColor(metrics, air)
{
	const low = metrics.cloud_cover_low ?? 50;
	const mid = metrics.cloud_cover_mid ?? 25;
	const high = metrics.cloud_cover_high ?? 25;

	const upper = mid * 0.6 + high * 0.4;

	const visKm = (metrics.visibility !== null) ? (metrics.visibility / 1000) : 12;
	const hum = metrics.relative_humidity_2m ?? 60;
	const precip = metrics.precipitation ?? 0;

	const aod = air?.aod;
	const dust = air?.dust;
	const pm25 = air?.pm25;

	let haze = 0.0;

	if (aod !== null && Number.isFinite(aod))
	{
		haze = clamp01((aod - 0.10) / 0.45);
	}

	let hazeExtra = 0.0;

	if (pm25 !== null && Number.isFinite(pm25))
	{
		hazeExtra += clamp01((pm25 - 10) / 35) * 0.25;
	}

	if (dust !== null && Number.isFinite(dust))
	{
		hazeExtra += clamp01((dust - 15) / 80) * 0.25;
	}

	haze = clamp01(haze + hazeExtra);

	const visBad = clamp01((10 - visKm) / 6);
	const lowBlock = clamp01((low - 35) / 45);

	let glow = 0.0;
	if (upper >= 25 && upper <= 60)
	{
		glow = 1.0;
	}
	else if (upper < 25)
	{
		glow = clamp01(upper / 25);
	}
	else
	{
		glow = clamp01((100 - upper) / 40);
	}

	const humHaze = clamp01((hum - 70) / 25) * 0.6;
	const rainKill = clamp01((precip - 0.2) / 1.0);

	const pastel = clamp01(0.25 + haze * 0.55 + visBad * 0.30 + humHaze * 0.30 + rainKill * 0.40);
	const blocked = clamp01(lowBlock * 0.65 + rainKill * 0.55);

	let red = clamp01(0.12 + haze * 0.70 + glow * 0.12 - blocked * 0.30 - pastel * 0.10);
	let pink = clamp01(0.16 + glow * 0.62 + haze * 0.10 - blocked * 0.35);
	let golden = clamp01(0.22 + glow * 0.40 + (1 - pastel) * 0.22 + (visKm / 20) * 0.12 - blocked * 0.25);
	let muted = clamp01(0.18 + pastel * 0.80 + blocked * 0.20);

	const sum = red + pink + golden + muted;
	red = red / sum;
	pink = pink / sum;
	golden = golden / sum;
	muted = muted / sum;

	let dominant = "tone_golden";
	let best = golden;

	if (pink > best) { best = pink; dominant = "tone_pink"; }
	if (red > best) { best = red; dominant = "tone_red"; }
	if (muted > best) { best = muted; dominant = (blocked > 0.55) ? "tone_grey" : "tone_muted"; }

	const pal = buildPalette(dominant, haze, glow, pastel);

	return {
		odds:
		{
			gold: Math.round(golden * 100),
			pink: Math.round(pink * 100),
			red: Math.round(red * 100),
			muted: Math.round(muted * 100)
		},
		dominant,
		haze,
		glow,
		pastel,
		blocked,
		lowCloudBlock: lowBlock,
		upperGlow: glow,
		palette: pal
	};
}

function buildPalette(dominant, haze, glow, pastel)
{
	const base =
	{
		tone_golden: ["#0b1024", "#1b2a5a", "#ffb35c", "#ff6a3c", "#ff2b2b"],
		tone_pink: ["#0b1024", "#2a1b5a", "#b46cff", "#ff4fa7", "#ff8a5c"],
		tone_red: ["#0b1024", "#2a0f1f", "#ff3b2e", "#ff7a2a", "#ffd08a"],
		tone_muted: ["#0b1024", "#1b2440", "#8aa0b8", "#c9a39a", "#ffb48a"],
		tone_grey: ["#0b1024", "#111729", "#59627a", "#8b92a4", "#c2c7d4"]
	};

	const arr = base[dominant] || base.tone_golden;

	const washTo = "#a7b5c8";
	const wash = clamp01(pastel * 0.55 + haze * 0.35);

	const warmTo = "#ff9a6b";
	const warm = clamp01(glow * 0.35);

	const out = arr.map((c, i) =>
	{
		let x = c;

		if (i >= 2)
		{
			x = mixHex(x, warmTo, warm);
		}

		x = mixHex(x, washTo, wash);

		return x;
	});

	return out;
}

function renderPalette(pal, dominantKey, odds)
{
	palette.innerHTML = "";

	pal.forEach((hex, idx) =>
	{
		const sw = document.createElement("div");
		sw.className = "swatch";

		const fill = document.createElement("div");
		fill.className = "swFill";
		fill.style.background = `linear-gradient(180deg, ${mixHex(hex, "#ffffff", 0.16)}, ${hex})`;

		const lab = document.createElement("div");
		lab.className = "swLabel";
		lab.textContent = idx === 0 ? "sky" : (idx === 4 ? "sun" : "tone");

		sw.appendChild(fill);
		sw.appendChild(lab);
		palette.appendChild(sw);
	});

	tonePill.textContent = T[dominantKey] || dominantKey;

	const meta = (T.tone_meta || "")
		.replace("{gold}", String(odds.gold))
		.replace("{pink}", String(odds.pink))
		.replace("{red}", String(odds.red))
		.replace("{muted}", String(odds.muted));

	toneMeta.textContent = meta;
}

// ---------- Tone scene (NOW with cloud density) ----------
function setToneScene(predicted)
{
	if (!toneScene) return;

	toneScene.classList.remove("toneScene--gold", "toneScene--pink", "toneScene--red", "toneScene--muted", "toneScene--grey");

	let cls = "toneScene--gold";
	let animName = "toneArcGold";

	if (predicted.dominant === "tone_pink")
	{
		cls = "toneScene--pink";
		animName = "toneArcPink";
	}
	else if (predicted.dominant === "tone_red")
	{
		cls = "toneScene--red";
		animName = "toneArcRed";
	}
	else if (predicted.dominant === "tone_muted")
	{
		cls = "toneScene--muted";
		animName = "toneArcMuted";
	}
	else if (predicted.dominant === "tone_grey")
	{
		cls = "toneScene--grey";
		animName = "toneArcGrey";
	}

	toneScene.classList.add(cls);

	if (toneSunPath)
	{
		toneSunPath.style.animationName = animName;
	}

	// Haze / stars
	const hazeOpacity = clamp01(predicted.haze * 0.75 + predicted.pastel * 0.35);
	const starOpacity = clamp01((predicted.blocked * 0.55) + (predicted.dominant === "tone_grey" ? 0.25 : 0.0));

	if (toneHaze) toneHaze.style.opacity = String(hazeOpacity);
	if (toneStars) toneStars.style.opacity = String(starOpacity);

	// Sun dimming
	const dim = (predicted.dominant === "tone_grey") ? 0.45 : (predicted.dominant === "tone_muted" ? 0.72 : 1.0);
	if (toneSun) toneSun.style.opacity = String(dim);

	// Water reflection tint
	const sunHex = predicted.palette?.[4] || "#ffb48a";
	if (toneWater)
	{
		toneWater.style.background =
			`linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.55)), ` +
			`radial-gradient(140px 48px at 50% 18%, ${sunHex}33, transparent 62%)`;
	}

	// ---------- Cloud density logic ----------
	// Base: muted/grey => thicker; gold/red/pink => thinner
	let baseOpacity = 0.78;
	let baseBlur = 0;
	let baseSat = 1.0;
	let baseBright = 1.0;

	if (predicted.dominant === "tone_grey")
	{
		baseOpacity = 0.92;
		baseBlur = 1.0;
		baseSat = 0.92;
		baseBright = 0.95;
	}
	else if (predicted.dominant === "tone_muted")
	{
		baseOpacity = 0.86;
		baseBlur = 0.7;
		baseSat = 0.96;
		baseBright = 0.98;
	}
	else if (predicted.dominant === "tone_red")
	{
		baseOpacity = 0.66;
		baseBlur = 0.0;
		baseSat = 1.05;
		baseBright = 1.05;
	}
	else if (predicted.dominant === "tone_pink")
	{
		baseOpacity = 0.68;
		baseBlur = 0.0;
		baseSat = 1.06;
		baseBright = 1.03;
	}
	else // gold
	{
		baseOpacity = 0.64;
		baseBlur = 0.0;
		baseSat = 1.06;
		baseBright = 1.06;
	}

	// Increase density if low clouds block / blocked high
	const extraDense = clamp01(predicted.lowCloudBlock * 0.65 + predicted.blocked * 0.45);
	const extraThin = clamp01(predicted.upperGlow * 0.45); // glow = pretty clouds -> visually "lighter"

	const opacity = clamp01(baseOpacity + extraDense * 0.22 - extraThin * 0.12);
	const blurPx = Math.max(0, baseBlur + extraDense * 1.2);
	const sat = clamp(baseSat - extraDense * 0.10 + extraThin * 0.06, 0.85, 1.15);
	const bright = clamp(baseBright - extraDense * 0.08 + extraThin * 0.05, 0.85, 1.15);

	// Set CSS vars on container so transitions are smooth
	toneScene.style.setProperty("--cloudOpacity", String(opacity));
	toneScene.style.setProperty("--cloudBlur", `${blurPx.toFixed(2)}px`);
	toneScene.style.setProperty("--cloudSat", String(sat.toFixed(2)));
	toneScene.style.setProperty("--cloudBright", String(bright.toFixed(2)));

	// Small per-cloud offsets: front cloud a bit denser
	if (toneClouds.length)
	{
		toneClouds.forEach((c, i) =>
		{
			const k = (i === 0) ? 1.08 : (i === 1 ? 1.0 : 0.92);
			c.style.opacity = String(clamp01(opacity * k));
			c.style.filter = `blur(${(blurPx * (i === 2 ? 1.2 : 1.0)).toFixed(2)}px) saturate(${sat.toFixed(2)}) brightness(${bright.toFixed(2)})`;
		});
	}
}

// ---------- Result UI ----------
function setResultUI(payload)
{
	pillProvider.textContent = `${T.source}: ${payload.provider}`;
	pillCoords.textContent = `${payload.lat.toFixed(4)}, ${payload.lon.toFixed(4)}`;

	scoreNum.textContent = String(payload.score);
	scoreLabel.textContent = T[payload.labelKey] || payload.labelKey;

	const windowInfo = buildSunsetWindow(payload.sunsetIso, payload.timezone);
	sunsetWindow.textContent = windowInfo.text;

	timeZoneVal.textContent = payload.timezone || "local";

	reasons.innerHTML = "";
	const dict = REASONS[LANG] || REASONS.en;

	payload.reasonKeys.forEach(k =>
	{
		const li = document.createElement("li");
		li.textContent = dict[k] || k;
		reasons.appendChild(li);
	});

	requestAnimationFrame(() =>
	{
		barFill.style.width = `${payload.score}%`;
	});

	if (windowInfo.isExact)
	{
		capTitle.textContent = T.caption_title_exact;
		capSub.textContent = T.caption_sub_exact;
	}
	else
	{
		capTitle.textContent = T.caption_title_approx;
		capSub.textContent = T.caption_sub_approx;
	}

	const predicted = predictColor(payload.metrics, payload.air);
	renderPalette(predicted.palette, predicted.dominant, predicted.odds);
	setToneScene(predicted);
}

// ---------- Flow ----------
async function runFlow(mode, manualCoords = null)
{
	try
	{
		setError(welcomeError, "");
		setError(resultError, "");

		showPanel(stepLoading);
		startLoadingTicker();

		await sleep(220);

		let lat = null;
		let lon = null;

		if (mode === "geo")
		{
			setLoadingLine(T.loading_steps[0]);
			const geo = await getBrowserGeo();
			lat = geo.lat;
			lon = geo.lon;
		}
		else if (mode === "ip")
		{
			setLoadingLine(T.loading_steps[0]);
			const geo = await getIpGeo();
			lat = geo.lat;
			lon = geo.lon;
		}
		else if (mode === "manual")
		{
			lat = manualCoords.lat;
			lon = manualCoords.lon;
		}
		else
		{
			throw new Error("Unknown mode");
		}

		setLoadingLine(T.loading_steps[1]);
		const data = await getDataFromProviders(lat, lon);

		setLoadingLine(T.loading_steps[2]);
		const air = await getAirOpenMeteo(lat, lon, data.targetMs);

		setLoadingLine(T.loading_steps[3]);
		await sleep(220);

		const scored = scoreSunset(data.metrics);

		stopLoadingTicker();

		setResultUI(
		{
			lat,
			lon,
			provider: data.provider,
			timezone: data.timezone || air.timezone,
			sunsetIso: data.sunsetIso,
			metrics: data.metrics,
			air,
			score: scored.score,
			labelKey: scored.labelKey,
			reasonKeys: scored.reasonKeys
		});

		showPanel(stepResult);
	}
	catch (e)
	{
		stopLoadingTicker();

		let msg = e?.message ? String(e.message) : "Error";
		if (mode === "ip")
		{
			msg = T.err_ip;
		}

		showPanel(stepWelcome);
		setError(welcomeError, msg);
	}
}

function resetUI()
{
	stopLoadingTicker();
	showPanel(stepWelcome);
	setError(welcomeError, "");
	setError(resultError, "");
	barFill.style.width = "0%";
	scoreNum.textContent = "--";
	scoreLabel.textContent = "—";
	reasons.innerHTML = "";
	sunsetWindow.textContent = "—";
	timeZoneVal.textContent = "—";
	pillProvider.textContent = "—";
	pillCoords.textContent = "—";
	palette.innerHTML = "";
	tonePill.textContent = "—";
	toneMeta.textContent = "—";

	if (toneScene)
	{
		toneScene.classList.remove("toneScene--gold", "toneScene--pink", "toneScene--red", "toneScene--muted", "toneScene--grey");
		toneScene.classList.add("toneScene--gold");
		toneScene.style.setProperty("--cloudOpacity", "0.8");
		toneScene.style.setProperty("--cloudBlur", "0px");
		toneScene.style.setProperty("--cloudSat", "1.0");
		toneScene.style.setProperty("--cloudBright", "1.0");

		if (toneHaze) toneHaze.style.opacity = "0";
		if (toneStars) toneStars.style.opacity = "0";
		if (toneSun) toneSun.style.opacity = "1";
		if (toneSunPath) toneSunPath.style.animationName = "toneArcGold";

		if (toneClouds.length)
		{
			toneClouds.forEach(c =>
			{
				c.style.opacity = "";
				c.style.filter = "";
			});
		}
	}
}

// ---------- Events ----------
btnGeo.addEventListener("click", () => runFlow("geo"));
btnIp.addEventListener("click", () => runFlow("ip"));

btnRestart.addEventListener("click", resetUI);
btnTryAgain.addEventListener("click", resetUI);

btnManualOpen.addEventListener("click", () =>
{
	manualBox.classList.toggle("hidden");
});

btnManualGo.addEventListener("click", () =>
{
	const lat = Number(latInput.value);
	const lon = Number(lonInput.value);

	if (!Number.isFinite(lat) || !Number.isFinite(lon))
	{
		setError(welcomeError, T.err_coords);
		return;
	}

	runFlow("manual", { lat, lon });
});

btnCopy.addEventListener("click", async () =>
{
	try
	{
		const text =
			`Sunset Chance: ${scoreNum.textContent}% (${scoreLabel.textContent}). ` +
			`${pillCoords.textContent}. ${sunsetWindow.textContent} (${timeZoneVal.textContent}).`;

		await navigator.clipboard.writeText(text);

		copyToast.textContent = T.copied;
		copyToast.classList.remove("hidden");
		setTimeout(() => copyToast.classList.add("hidden"), 1200);
	}
	catch
	{
		copyToast.textContent = T.copy_failed;
		copyToast.classList.remove("hidden");
		setTimeout(() => copyToast.classList.add("hidden"), 1200);
	}
});

// Init
applyI18n();
resetUI();
