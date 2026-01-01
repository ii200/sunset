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

const colorChip = document.getElementById("colorChip");
const colorDesc = document.getElementById("colorDesc");

const copyToast = document.getElementById("copyToast");

// Optional future-info blocks (will be filled only if they exist in HTML)
const futureBox = document.getElementById("futureBox");
const futureTiming = document.getElementById("futureTiming");
const futureDrama = document.getElementById("futureDrama");
const futureHorizon = document.getElementById("futureHorizon");
const futureHaze = document.getElementById("futureHaze");
const futureClouds = document.getElementById("futureClouds");

// ---------- i18n ----------
function detectLang()
{
	const saved = localStorage.getItem("sunset_lang");
	if (saved === "ru" || saved === "en" || saved === "es")
	{
		return saved;
	}

	const raw = (navigator.languages && navigator.languages[0]) ? navigator.languages[0] : (navigator.language || "en");
	const lower = raw.toLowerCase();

	if (lower.startsWith("ru")) return "ru";
	if (lower.startsWith("es")) return "es";
	return "en";
}

let LANG = detectLang();

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

		loading_title: "Считаю закат…",
		loading_tip: "Эвристика ≠ гарантия. Лучший результат — с точной геолокацией.",

		loading_steps:
		[
			"Подключаюсь к погодному провайдеру",
			"Получаю время заката и слои облачности",
			"Проверяю осадки, видимость и влажность",
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

		color_title: "Возможные цвета заката",

		window_unknown: "Вечернее окно: 18:30–20:30 (оценка)",
		caption_title_exact: "Окно заката",
		caption_sub_exact: "Оценка основана на погоде около времени заката.",
		caption_title_approx: "Вечернее окно",
		caption_sub_approx: "Точное время заката недоступно у текущего источника — оценка взята на вечер.",

		label_very_high: "Очень высокий шанс",
		label_high: "Высокий шанс",
		label_mid: "Средний шанс",
		label_low: "Низкий шанс",

		palette_warm_title: "Тёплый золото-оранжевый",
		palette_warm_desc: "Обычно получается, когда горизонт открыт (мало низких облаков), а выше есть немного облаков для подсветки.",
		palette_crimson_title: "Красно-малиновый / драматичный",
		palette_crimson_desc: "Часто бывает при влажности/дымке: свет сильнее «краснеет», контраст может стать мягче.",
		palette_pastel_title: "Пастельный (персик/розовый)",
		palette_pastel_desc: "Бывает при умеренной дымке и лёгкой облачности: цвета нежнее, без жёсткой драматичности.",
		palette_flat_title: "Сдержанный (может быть ровно)",
		palette_flat_desc: "Когда облаков почти нет (нечему подсвечиваться) или небо сильно закрыто низкой облачностью.",

		future_title: "Что ещё можно ожидать",
		future_timing: "Лучшее время: выйди за 20–35 минут до центра окна и останься ещё 10–15 минут после.",
		future_drama_soft: "Контраст мягкий: закат будет нежнее, без резких градиентов.",
		future_drama_strong: "Контраст высокий: больше шансов на «вау»-градиенты и лучи.",
		future_horizon_risk_low: "Горизонт скорее открыт: линия солнца должна читаться.",
		future_horizon_risk_high: "Есть риск низких облаков у горизонта: солнце может «спрятаться» раньше.",
		future_haze_low: "Дымка/туман маловероятны: цвета обычно чище.",
		future_haze_high: "Есть риск дымки: цвета могут быть мягче, но красный оттенок вероятнее.",
		future_clouds_fmt: "Облачность у окна: низк. {low}%, средн. {mid}%, высок. {high}%",

		footer: "Всё имеет свой закат, только ночь заканчивается рассветом.",

		err_geo: "Не удалось получить геолокацию.",
		err_coords: "Введите корректные lat/lon.",
		err_ip: "Не удалось определить локацию по IP."
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
			"Checking precipitation, visibility and humidity",
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

		color_title: "Possible sunset colors",

		window_unknown: "Evening window: 18:30–20:30 (estimate)",
		caption_title_exact: "Sunset window",
		caption_sub_exact: "Score is based on the weather around sunset time.",
		caption_title_approx: "Evening window",
		caption_sub_approx: "Exact sunset time is unavailable for this source — evening estimate used.",

		label_very_high: "Very high chance",
		label_high: "High chance",
		label_mid: "Medium chance",
		label_low: "Low chance",

		palette_warm_title: "Warm golden/orange",
		palette_warm_desc: "Common when the horizon is open (few low clouds) and there are some mid/high clouds to glow.",
		palette_crimson_title: "Crimson / dramatic reds",
		palette_crimson_desc: "Often with humidity/haze: light shifts redder, contrast becomes softer.",
		palette_pastel_title: "Pastel (peach/pink)",
		palette_pastel_desc: "With moderate haze and light cloud texture: gentle colors, less drama.",
		palette_flat_title: "Muted / may look flat",
		palette_flat_desc: "When there are almost no clouds to catch light or low clouds block the horizon.",

		future_title: "What else to expect",
		future_timing: "Best time: go out 20–35 minutes before the center of the window, stay 10–15 minutes after.",
		future_drama_soft: "Soft contrast: gentler look, fewer hard gradients.",
		future_drama_strong: "High contrast: better odds for “wow” gradients and crepuscular rays.",
		future_horizon_risk_low: "Horizon likely open: the sun line should be visible.",
		future_horizon_risk_high: "Risk of low clouds near horizon: the sun may disappear earlier.",
		future_haze_low: "Haze/fog unlikely: colors tend to be cleaner.",
		future_haze_high: "Haze risk: softer colors, but reds become more likely.",
		future_clouds_fmt: "Clouds near the window: low {low}%, mid {mid}%, high {high}%",

		footer: "Everything has its sunset, only the night ends with dawn.",

		err_geo: "Could not get geolocation.",
		err_coords: "Please enter valid lat/lon.",
		err_ip: "Could not detect location by IP."
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
			"Revisando precipitación, visibilidad y humedad",
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

		color_title: "Colores posibles del atardecer",

		window_unknown: "Ventana: 18:30–20:30 (estimación)",
		caption_title_exact: "Ventana del atardecer",
		caption_sub_exact: "El puntaje se basa en el clima cerca del atardecer.",
		caption_title_approx: "Ventana de la tarde",
		caption_sub_approx: "No hay hora exacta para esta fuente — se usa una estimación vespertina.",

		label_very_high: "Probabilidad muy alta",
		label_high: "Probabilidad alta",
		label_mid: "Probabilidad media",
		label_low: "Probabilidad baja",

		palette_warm_title: "Cálido dorado/naranja",
		palette_warm_desc: "Suele pasar con horizonte abierto (pocas nubes bajas) y algo de nubes medias/altas para iluminar.",
		palette_crimson_title: "Rojo carmín / dramático",
		palette_crimson_desc: "Con humedad/neblina: la luz se vuelve más roja y el contraste baja.",
		palette_pastel_title: "Pastel (durazno/rosa)",
		palette_pastel_desc: "Con neblina moderada y algo de textura: colores suaves, menos drama.",
		palette_flat_title: "Más apagado / puede verse plano",
		palette_flat_desc: "Si no hay nubes para captar luz o nubes bajas tapan el horizonte.",

		future_title: "Qué más esperar",
		future_timing: "Mejor momento: salí 20–35 minutos antes del centro de la ventana y quedate 10–15 minutos después.",
		future_drama_soft: "Contraste suave: look más delicado, menos gradientes duros.",
		future_drama_strong: "Contraste alto: más chances de “wow” y rayos crepusculares.",
		future_horizon_risk_low: "Horizonte probablemente abierto: se vería bien la línea del sol.",
		future_horizon_risk_high: "Riesgo de nubes bajas en el horizonte: el sol puede taparse antes.",
		future_haze_low: "Poca chance de neblina: colores suelen ser más limpios.",
		future_haze_high: "Riesgo de neblina: colores más suaves, pero rojos más probables.",
		future_clouds_fmt: "Nubes cerca de la ventana: bajas {low}%, medias {mid}%, altas {high}%",

		footer: "Todo tiene su ocaso, sólo la noche termina con el amanecer.",

		err_geo: "No se pudo obtener la geolocalización.",
		err_coords: "Ingresá lat/lon válidos.",
		err_ip: "No se pudo detectar la ubicación por IP."
	}
};

function T()
{
	return I18N[LANG] || I18N.en;
}

function applyI18n()
{
	const t = T();

	document.querySelectorAll("[data-i18n]").forEach(el =>
	{
		const key = el.getAttribute("data-i18n");
		if (t[key] !== undefined)
		{
			el.textContent = t[key];
		}
	});

	langPill.textContent = `UI: ${t.lang_name}`;
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

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function cacheBustUrl(url)
{
	const sep = url.includes("?") ? "&" : "?";
	return `${url}${sep}_=${Date.now()}`;
}

async function fetchWithTimeout(url, timeoutMs = 12000, headers = {})
{
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try
	{
		const res = await fetch(cacheBustUrl(url),
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

// ---------- Scoring with reason keys ----------
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

// ---------- Color prediction + "future info" ----------
function safePct(v)
{
	if (v === null || v === undefined || !Number.isFinite(v)) return null;
	return clamp(Math.round(v), 0, 100);
}

function predictSunsetPalette(m)
{
	const low = safePct(m.cloud_cover_low);
	const mid = safePct(m.cloud_cover_mid);
	const high = safePct(m.cloud_cover_high);

	const humidity = (m.relative_humidity_2m !== null && m.relative_humidity_2m !== undefined) ? Number(m.relative_humidity_2m) : null;
	const visibilityKm = (m.visibility !== null && m.visibility !== undefined) ? (Number(m.visibility) / 1000) : null;

	const upper =
		(mid !== null || high !== null)
			? ((mid !== null ? mid : 0) * 0.6 + (high !== null ? high : 0) * 0.4)
			: null;

	const hazy =
		(humidity !== null && humidity > 82) ||
		(visibilityKm !== null && visibilityKm < 9);

	let paletteKey = "palette_warm_title";
	let paletteDescKey = "palette_warm_desc";

	if (low !== null && low > 65)
	{
		paletteKey = "palette_flat_title";
		paletteDescKey = "palette_flat_desc";
	}
	else if (upper !== null && upper < 12)
	{
		paletteKey = "palette_flat_title";
		paletteDescKey = "palette_flat_desc";
	}
	else if (hazy)
	{
		paletteKey = "palette_crimson_title";
		paletteDescKey = "palette_crimson_desc";
	}
	else if ((humidity !== null && humidity > 70) || (upper !== null && upper >= 12 && upper < 22))
	{
		paletteKey = "palette_pastel_title";
		paletteDescKey = "palette_pastel_desc";
	}

	const drama = estimateDrama(m, paletteKey);
	const horizonRisk = estimateHorizonRisk(low);
	const hazeRisk = estimateHazeRisk(humidity, visibilityKm);

	return {
		paletteKey,
		paletteDescKey,
		low,
		mid,
		high,
		humidity,
		visibilityKm,
		drama,
		horizonRisk,
		hazeRisk
	};
}

function estimateDrama(m, paletteKey)
{
	const low = safePct(m.cloud_cover_low);
	const mid = safePct(m.cloud_cover_mid);
	const high = safePct(m.cloud_cover_high);

	const upper =
		(mid !== null || high !== null)
			? ((mid !== null ? mid : 0) * 0.6 + (high !== null ? high : 0) * 0.4)
			: null;

	// Base: texture in the upper layers gives drama, but too much blocks it.
	let v = 0;

	if (upper === null)
	{
		v = 40;
	}
	else if (upper >= 25 && upper <= 60)
	{
		v = 78;
	}
	else if (upper < 15)
	{
		v = 35;
	}
	else if (upper > 75)
	{
		v = 45;
	}
	else
	{
		v = 62;
	}

	// Horizon blocking hurts drama, too.
	if (low !== null && low > 60) v -= 18;
	else if (low !== null && low > 40) v -= 8;

	// Palette hint
	if (paletteKey === "palette_crimson_title") v += 6;
	if (paletteKey === "palette_flat_title") v -= 10;

	return clamp(Math.round(v), 0, 100);
}

function estimateHorizonRisk(low)
{
	if (low === null) return 45;
	if (low > 65) return 78;
	if (low > 45) return 55;
	return 25;
}

function estimateHazeRisk(humidity, visibilityKm)
{
	let r = 35;

	if (humidity !== null && humidity > 85) r += 25;
	else if (humidity !== null && humidity > 75) r += 12;

	if (visibilityKm !== null && visibilityKm < 8) r += 25;
	else if (visibilityKm !== null && visibilityKm < 12) r += 10;

	return clamp(Math.round(r), 0, 100);
}

function setFutureInfoUI(paletteObj, windowInfo)
{
	const t = T();

	// If HTML block exists — fill it. Otherwise do nothing.
	if (futureBox)
	{
		futureBox.classList.remove("hidden");
	}

	if (futureTiming)
	{
		futureTiming.textContent = t.future_timing;
	}

	if (futureDrama)
	{
		futureDrama.textContent = (paletteObj.drama >= 65) ? t.future_drama_strong : t.future_drama_soft;
	}

	if (futureHorizon)
	{
		futureHorizon.textContent = (paletteObj.horizonRisk >= 55) ? t.future_horizon_risk_high : t.future_horizon_risk_low;
	}

	if (futureHaze)
	{
		futureHaze.textContent = (paletteObj.hazeRisk >= 55) ? t.future_haze_high : t.future_haze_low;
	}

	if (futureClouds)
	{
		const low = (paletteObj.low === null) ? "—" : String(paletteObj.low);
		const mid = (paletteObj.mid === null) ? "—" : String(paletteObj.mid);
		const high = (paletteObj.high === null) ? "—" : String(paletteObj.high);

		futureClouds.textContent =
			t.future_clouds_fmt
				.replace("{low}", low)
				.replace("{mid}", mid)
				.replace("{high}", high);
	}
}

// Dynamic palette for animation (CSS vars). Works if CSS uses these vars.
function paletteToCssVars(paletteKey)
{
	if (paletteKey === "palette_crimson_title")
	{
		return {
			"--skyA": "rgba(90,40,120,.22)",
			"--skyB": "rgba(0,0,0,.62)",
			"--glowA": "rgba(238,0,0,.26)",
			"--glowB": "rgba(255,120,80,.18)",
			"--sunA": "rgba(255,235,220,1)",
			"--sunB": "rgba(255,120,90,1)",
			"--sunC": "rgba(238,0,0,.38)"
		};
	}

	if (paletteKey === "palette_pastel_title")
	{
		return {
			"--skyA": "rgba(120,120,240,.18)",
			"--skyB": "rgba(0,0,0,.56)",
			"--glowA": "rgba(255,170,160,.22)",
			"--glowB": "rgba(255,200,180,.14)",
			"--sunA": "rgba(255,245,235,1)",
			"--sunB": "rgba(255,200,160,1)",
			"--sunC": "rgba(255,120,120,.22)"
		};
	}

	if (paletteKey === "palette_flat_title")
	{
		return {
			"--skyA": "rgba(90,100,140,.14)",
			"--skyB": "rgba(0,0,0,.66)",
			"--glowA": "rgba(190,190,210,.14)",
			"--glowB": "rgba(140,160,220,.10)",
			"--sunA": "rgba(240,240,245,1)",
			"--sunB": "rgba(220,220,230,1)",
			"--sunC": "rgba(120,140,200,.18)"
		};
	}

	return {
		"--skyA": "rgba(97,94,239,.18)",
		"--skyB": "rgba(0,0,0,.55)",
		"--glowA": "rgba(255,180,90,.36)",
		"--glowB": "rgba(238,0,0,.18)",
		"--sunA": "rgba(255,240,220,1)",
		"--sunB": "rgba(255,180,90,1)",
		"--sunC": "rgba(238,0,0,.28)"
	};
}

function applyPaletteCssVars(vars)
{
	const root = document.documentElement;
	Object.keys(vars).forEach(k => root.style.setProperty(k, vars[k]));
}

// ---------- Providers ----------
async function getDataOpenMeteo(lat, lon)
{
	const url =
		`https://api.open-meteo.com/v1/forecast` +
		`?latitude=${lat}&longitude=${lon}` +
		`&hourly=cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation,visibility,relative_humidity_2m` +
		`&daily=sunset` +
		`&forecast_days=1` +
		`&timezone=auto`;

	const data = await fetchWithTimeout(url, 14000);

	const tz = data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
	const sunsetIso = data.daily.sunset[0];

	const sunset = new Date(sunsetIso).getTime();
	const times = data.hourly.time;

	let best = 0;
	let diff = Infinity;

	times.forEach((t, i) =>
	{
		const d = Math.abs(new Date(t).getTime() - sunset);
		if (d < diff)
		{
			diff = d;
			best = i;
		}
	});

	return {
		provider: "open-meteo",
		timezone: tz,
		sunsetIso,
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
	const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

	const data = await fetchWithTimeout(
		url,
		14000,
		{
			"Accept": "application/json"
		}
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
			setLoadingLine(`${T().loading_steps[0]}: ${p.name}`);
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

// IP geo with fallbacks
async function getIpGeo()
{
	const providers =
	[
		{
			name: "ipapi.co",
			url: "https://ipapi.co/json/",
			parse: (g) => ({ lat: Number(g.latitude), lon: Number(g.longitude) })
		},
		{
			name: "ipwho.is",
			url: "https://ipwho.is/",
			parse: (g) =>
			{
				if (g && g.success === false) throw new Error("ipwho.is failed");
				return { lat: Number(g.latitude), lon: Number(g.longitude) };
			}
		},
		{
			name: "ipinfo.io",
			url: "https://ipinfo.io/json",
			parse: (g) =>
			{
				const loc = String(g.loc || "");
				const parts = loc.split(",");
				return { lat: Number(parts[0]), lon: Number(parts[1]) };
			}
		}
	];

	let lastError = null;

	for (const p of providers)
	{
		try
		{
			setLoadingLine(`${T().loading_steps[0]}: ${p.name}`);
			const geo = await fetchWithTimeout(p.url, 14000);

			const coords = p.parse(geo);

			if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lon))
			{
				throw new Error("Bad coords");
			}

			return coords;
		}
		catch (e)
		{
			lastError = e;
		}
	}

	throw lastError || new Error(T().err_ip);
}

// ---------- Time formatting (sunset window) ----------
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
		return { text: T().window_unknown, isExact: false };
	}

	const center = new Date(sunsetIso);
	const from = new Date(center.getTime() - 40 * 60 * 1000);
	const to = new Date(center.getTime() + 15 * 60 * 1000);

	const fromTxt = formatTime(from, timeZone);
	const toTxt = formatTime(to, timeZone);

	return { text: `${fromTxt}–${toTxt}`, isExact: true, center };
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
	setLoadingLine(T().loading_steps[0]);

	loadingTicker = setInterval(() =>
	{
		i = (i + 1) % T().loading_steps.length;
		setLoadingLine(T().loading_steps[i]);
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

// ---------- Result UI ----------
function setResultUI(payload)
{
	pillProvider.textContent = `${T().source}: ${payload.provider}`;
	pillCoords.textContent = `${payload.lat.toFixed(4)}, ${payload.lon.toFixed(4)}`;

	scoreNum.textContent = String(payload.score);
	scoreLabel.textContent = T()[payload.labelKey] || payload.labelKey;

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

	// --- predicted sunset color + extra future info ---
	const palette = predictSunsetPalette(payload.metrics);
	const t = T();

	if (colorChip)
	{
		colorChip.textContent = t[palette.paletteKey] || "—";
	}
	if (colorDesc)
	{
		colorDesc.textContent = t[palette.paletteDescKey] || "—";
	}

	// dynamic palette for loader/art if CSS uses these vars
	applyPaletteCssVars(paletteToCssVars(palette.paletteKey));

	// "future info" section (only if HTML IDs exist)
	setFutureInfoUI(palette, windowInfo);

	requestAnimationFrame(() =>
	{
		barFill.style.width = `${payload.score}%`;
	});

	if (windowInfo.isExact)
	{
		capTitle.textContent = T().caption_title_exact;
		capSub.textContent = T().caption_sub_exact;
	}
	else
	{
		capTitle.textContent = T().caption_title_approx;
		capSub.textContent = T().caption_sub_approx;
	}
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
			setLoadingLine(T().loading_steps[0]);
			const geo = await getBrowserGeo();
			lat = geo.lat;
			lon = geo.lon;
		}
		else if (mode === "ip")
		{
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

		setLoadingLine(T().loading_steps[1]);
		const data = await getDataFromProviders(lat, lon);

		setLoadingLine(T().loading_steps[3]);
		await sleep(220);

		const scored = scoreSunset(data.metrics);

		stopLoadingTicker();

		setResultUI(
		{
			lat,
			lon,
			provider: data.provider,
			timezone: data.timezone,
			sunsetIso: data.sunsetIso,
			score: scored.score,
			labelKey: scored.labelKey,
			reasonKeys: scored.reasonKeys,
			metrics: data.metrics
		});

		showPanel(stepResult);
	}
	catch (e)
	{
		stopLoadingTicker();

		const msg = e?.message ? String(e.message) : "Error";
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

	if (colorChip) colorChip.textContent = "—";
	if (colorDesc) colorDesc.textContent = "—";

	if (futureBox) futureBox.classList.add("hidden");
	if (futureTiming) futureTiming.textContent = "";
	if (futureDrama) futureDrama.textContent = "";
	if (futureHorizon) futureHorizon.textContent = "";
	if (futureHaze) futureHaze.textContent = "";
	if (futureClouds) futureClouds.textContent = "";

	applyPaletteCssVars(paletteToCssVars("palette_warm_title"));
}

// ---------- Language switch (bottom pill) ----------
function cycleLang()
{
	const order = ["en", "es", "ru"];
	const idx = order.indexOf(LANG);
	const next = order[(idx + 1) % order.length];

	LANG = next;
	localStorage.setItem("sunset_lang", LANG);

	applyI18n();
	resetUI();
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
		setError(welcomeError, T().err_coords);
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
			`${pillCoords.textContent}. ${sunsetWindow.textContent} (${timeZoneVal.textContent}). ` +
			`${T().color_title}: ${colorChip ? colorChip.textContent : "—"}.`;

		await navigator.clipboard.writeText(text);

		copyToast.textContent = T().copied;
		copyToast.classList.remove("hidden");
		setTimeout(() => copyToast.classList.add("hidden"), 1200);
	}
	catch
	{
		copyToast.textContent = T().copy_failed;
		copyToast.classList.remove("hidden");
		setTimeout(() => copyToast.classList.add("hidden"), 1200);
	}
});

langPill.addEventListener("click", cycleLang);

// Init
applyI18n();
resetUI();
