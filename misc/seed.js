import operationsModel from '../models/operations.js';
import sourceModel from '../models/source.js';
import taxTypeModel from '../models/taxType.js';
import wayDetectionModel from '../models/wayDetection.js';
import frequencyModel from '../models/frequency.js';
import effectsModel from '../models/effects.js';
import probabilityModel from '../models/probability.js';
import db from './db.js';

db
  .then(async ({disconnect}) => {
    const taxType = ["Налог на добавленную стоимость", "Акцизы на этиловый спирт, алкогольную и (или) подакцизную спиртосодержащую продукцию", "Налог на прибыль организаций", "Сбор за пользование объектами животного мира", "Водный налог", "Налог на дополнительный доход от добычи углеводородного сырья", "Налог на добычу полезных ископаемых", "Налог на имущество организаций", "Земельный налог", "Транспортный налог", "Налог на доходы физических лиц", "Налог на доходы иностранных юридических лиц", "Страховые взносы"];

    const operations = ["Вознаграждение за открытие и ведение банковских счетов", "Формирование налоговой отчетности  по налогу на прибыль"];

    const sources = ["Нарушение ВНД", "Несвоевременное представление первичных документов", "Человеческий фактор / Ошибки при сопровождении операций", "Не учет рекомендаций Налоговой службы Банка", "Ошибки в работе ИТ-систем", "Внешние факторы", "Разность подходов к оценке экономической обоснованности", "Несоответствие заявленного контрагентом статуса бенефициарного собственника его фактическому статусу", "Методологические ошибки ведения налогового учета", "Ошибки в первичных документах", "Отсутствие регламентации процесса в Банке", "Отсутствие, неопределенность или неполнота нормативного (законодательного) регулирования по вопросам налогообложения", "Недобросовестные контрагенты", "Реализация правового риска"];

    const wayDetection = ["Опросный лист", "Анализ входящих данных", "Анализ графических данных", "Консультации специалистов", "Инспекционная и ревизионная деятельность", "Неверное распределение доходов по видам"];

    const frequencyProbabilityEffects = [1, 2, 3];

    const mappedTaxType = taxType.map((tax) => {
      return new taxTypeModel({ description: tax })
    });

    const mappedOperations = operations.map((oper) => {
      return new operationsModel({ description: oper })
    });

    const mappedSources = sources.map((source) => {
      return new sourceModel({ description: source })
    });

    const mappedWayDetection = wayDetection.map((way) => {
      return new wayDetectionModel({ description: way })
    });

    const mappedFrequency = frequencyProbabilityEffects.map((number) => {
      return new frequencyModel({level: number})
    });

    const mappedProbability = frequencyProbabilityEffects.map((number) => {
      return new probabilityModel({level: number})
    });

    const mappedEffects = frequencyProbabilityEffects.map((number) => {
      return new effectsModel({level: number})
    });

    await taxTypeModel.insertMany(mappedTaxType);
    await operationsModel.insertMany(mappedOperations);
    await sourceModel.insertMany(mappedSources);
    await wayDetectionModel.insertMany(mappedWayDetection);
    await frequencyModel.insertMany(mappedFrequency);
    await probabilityModel.insertMany(mappedProbability);
    await effectsModel.insertMany(mappedEffects);

    disconnect();
  })
  .catch((err) => {
    console.error(err);
  });
