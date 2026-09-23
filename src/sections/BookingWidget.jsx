import { useId, useState } from 'react';
import Button from '../components/Button';
import Field, { fieldGrid, inputClass, selectClass } from '../components/Field';
import { CarSide, PlaneDeparture } from '../components/icons';
import { cx } from '../lib/classes';
import { useT } from '../i18n/LanguageContext';
import { airports, carTypes } from '../data/content';

const ICONS = {
  car: '/assets/icon/fi_9610434.svg',
  pickup: '/assets/icon/Frame76.svg',
  dropoff: '/assets/icon/fi_14910621.svg',
  clock: '/assets/icon/fi_12516022.svg',
};

const TAB =
  'inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border px-2.5 py-3 ' +
  'text-[15px] font-semibold tracking-[-0.4px] transition duration-300 ease-gb ' +
  'md:flex-none md:justify-start md:px-8 md:py-3.5 md:text-lg';

const RADIO =
  'size-5 appearance-none rounded-full border-2 border-gb-border transition duration-250 ease-gb ' +
  'checked:border-gb-primary checked:shadow-[inset_0_0_0_4px_var(--color-gb-primary)] ' +
  'group-hover:not-checked:border-gb-primary';

const initialCarRental = {
  carType: '',
  pickup: '',
  dropoff: '',
  pickupAt: '',
  returnAt: '',
  duration: '',
  tripType: 'one-way',
};

const initialAirport = {
  carType: '',
  airport: '',
  location: '',
  pickupAt: '',
  direction: 'from-airport',
};

function Radios({ name, value, options, onChange, label }) {
  return (
    <div className="flex flex-wrap items-center gap-4.5 md:gap-7" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <label
          key={option.id}
          className="group inline-flex cursor-pointer items-center gap-2 text-base font-medium text-gb-ink"
        >
          <input
            type="radio"
            name={name}
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            className={RADIO}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * The booking card that overlaps the hero. It is a self-contained controlled
 * form: no backend here, so submitting simply reports the collected payload.
 */
export default function BookingWidget() {
  const [activeTab, setActiveTab] = useState('car-rental');
  const [carRental, setCarRental] = useState(initialCarRental);
  const [airport, setAirport] = useState(initialAirport);
  const [summary, setSummary] = useState(null);
  const uid = useId();
  const t = useT();
  const c = t.booking;

  const updateCar = (patch) => setCarRental((prev) => ({ ...prev, ...patch }));
  const updateAirport = (patch) => setAirport((prev) => ({ ...prev, ...patch }));

  const submit = (event, payload) => {
    event.preventDefault();
    setSummary(payload);
  };

  const isHourly = carRental.tripType === 'hourly';
  const isRoundTrip = carRental.tripType === 'round-way';
  const fromAirport = airport.direction === 'from-airport';

  const tabClass = (id) =>
    cx(
      TAB,
      activeTab === id
        ? 'border-gb-ink bg-gb-ink text-white'
        : 'border-gb-border bg-white text-gb-ink hover:border-gb-primary hover:text-gb-primary'
    );

  return (
    <div>
      <div
        className="flex gap-2 rounded-t-xl bg-white px-3.5 pt-3.5 md:inline-flex md:gap-3 md:px-5 md:pt-5"
        role="tablist"
        aria-label={c.bookingType}
      >
        <button
          type="button"
          role="tab"
          id={`${uid}-tab-car`}
          aria-selected={activeTab === 'car-rental'}
          aria-controls={`${uid}-panel-car`}
          className={tabClass('car-rental')}
          onClick={() => setActiveTab('car-rental')}
        >
          <CarSide className="size-5" />
          {c.carRental}
        </button>
        <button
          type="button"
          role="tab"
          id={`${uid}-tab-airport`}
          aria-selected={activeTab === 'airport-rental'}
          aria-controls={`${uid}-panel-airport`}
          className={tabClass('airport-rental')}
          onClick={() => setActiveTab('airport-rental')}
        >
          <PlaneDeparture className="size-5" />
          {c.airportRental}
        </button>
      </div>

      <div className="rounded-b-xl bg-white p-4.5 shadow-[0_-9px_19px_rgba(186,186,186,0.1),0_24px_60px_rgba(18,18,18,0.08)] md:rounded-tr-xl md:p-7">
        {activeTab === 'car-rental' ? (
          <form
            role="tabpanel"
            id={`${uid}-panel-car`}
            aria-labelledby={`${uid}-tab-car`}
            onSubmit={(e) => submit(e, { type: 'car-rental', ...carRental })}
          >
            <div className={fieldGrid}>
              <Field icon={ICONS.car} label={c.chooseCar}>
                <select
                  className={selectClass}
                  value={carRental.carType}
                  onChange={(e) => updateCar({ carType: e.target.value })}
                  required
                >
                  <option value="">{c.selectCarType}</option>
                  {carTypes.map((car) => (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  ))}
                </select>
              </Field>

              <Field icon={ICONS.pickup} label={c.pickupLocation}>
                <input
                  className={inputClass}
                  type="text"
                  placeholder={c.enterPickup}
                  value={carRental.pickup}
                  onChange={(e) => updateCar({ pickup: e.target.value })}
                  required
                />
              </Field>

              {/* Hourly trips have no destination — they book a block of time. */}
              {isHourly ? (
                <Field icon={ICONS.clock} label={c.duration}>
                  <select
                    className={selectClass}
                    value={carRental.duration}
                    onChange={(e) => updateCar({ duration: e.target.value })}
                    required
                  >
                    <option value="">{c.selectDuration}</option>
                    {c.durations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : (
                <Field icon={ICONS.dropoff} label={c.dropoffLocation}>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder={c.enterDropoff}
                    value={carRental.dropoff}
                    onChange={(e) => updateCar({ dropoff: e.target.value })}
                    required
                  />
                </Field>
              )}

              <Field icon={ICONS.clock} label={c.pickupDateTime}>
                <input
                  className={inputClass}
                  type="datetime-local"
                  value={carRental.pickupAt}
                  onChange={(e) => updateCar({ pickupAt: e.target.value })}
                  required
                />
              </Field>

              {/* A round trip needs a return leg. */}
              {isRoundTrip && (
                <Field icon={ICONS.clock} label={c.returnDateTime}>
                  <input
                    className={inputClass}
                    type="datetime-local"
                    value={carRental.returnAt}
                    onChange={(e) => updateCar({ returnAt: e.target.value })}
                    required
                  />
                </Field>
              )}
            </div>

            <div className="mt-7 flex flex-col items-stretch justify-between gap-6 md:flex-row md:flex-wrap md:items-center">
              <Radios
                label={c.tripType}
                name={`${uid}-trip-type`}
                value={carRental.tripType}
                onChange={(tripType) => updateCar({ tripType })}
                options={[
                  { id: 'one-way', label: c.oneWay },
                  { id: 'round-way', label: c.roundWay },
                  { id: 'hourly', label: c.hourly },
                ]}
              />
              <Button type="submit" className="w-full md:w-auto md:min-w-50">
                {c.continue}
              </Button>
            </div>
          </form>
        ) : (
          <form
            role="tabpanel"
            id={`${uid}-panel-airport`}
            aria-labelledby={`${uid}-tab-airport`}
            onSubmit={(e) => submit(e, { type: 'airport-rental', ...airport })}
          >
            <div className={fieldGrid}>
              <Field icon={ICONS.car} label={c.chooseCar}>
                <select
                  className={selectClass}
                  value={airport.carType}
                  onChange={(e) => updateAirport({ carType: e.target.value })}
                  required
                >
                  <option value="">{c.selectCarType}</option>
                  {carTypes.map((car) => (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  ))}
                </select>
              </Field>

              {/* The direction toggle decides which side the airport sits on. */}
              <Field
                icon={fromAirport ? ICONS.pickup : ICONS.dropoff}
                label={fromAirport ? c.pickupAirport : c.dropoffAirport}
               
              >
                <select
                  className={selectClass}
                  value={airport.airport}
                  onChange={(e) => updateAirport({ airport: e.target.value })}
                  required
                >
                  <option value="">{c.selectAirport}</option>
                  {airports.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                icon={fromAirport ? ICONS.dropoff : ICONS.pickup}
                label={fromAirport ? c.dropoffLocation : c.pickupLocation}
              >
                <input
                  className={inputClass}
                  type="text"
                  placeholder={fromAirport ? c.enterDropoff : c.enterPickup}
                  value={airport.location}
                  onChange={(e) => updateAirport({ location: e.target.value })}
                  required
                />
              </Field>

              <Field icon={ICONS.clock} label={c.pickupDateTime}>
                <input
                  className={inputClass}
                  type="datetime-local"
                  value={airport.pickupAt}
                  onChange={(e) => updateAirport({ pickupAt: e.target.value })}
                  required
                />
              </Field>
            </div>

            <div className="mt-7 flex flex-col items-stretch justify-between gap-6 md:flex-row md:flex-wrap md:items-center">
              <Radios
                label={c.direction}
                name={`${uid}-direction`}
                value={airport.direction}
                onChange={(direction) => updateAirport({ direction })}
                options={[
                  { id: 'from-airport', label: c.fromAirport },
                  { id: 'from-home', label: c.fromHome },
                ]}
              />
              <Button type="submit" className="w-full md:w-auto md:min-w-50">
                {c.continue}
              </Button>
            </div>
          </form>
        )}

        {summary && (
          <p
            className="mt-5 rounded-lg bg-gb-primary-soft px-4.5 py-3.5 text-[15px] font-semibold text-gb-primary"
            role="status"
          >
            {c.searching}
            {summary.carType ? ` · ${summary.carType}` : ''}
            {summary.pickup || summary.airport ? ` · ${summary.pickup || summary.airport}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}
